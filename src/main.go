package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	_ "github.com/tursodatabase/go-libsql"
)

type Task struct {
	Id          int64
	IsDone      bool
	Description string
}

var db *sql.DB

func openDB() {
	if db != nil {
		return
	}

	url, urlIsPresent := os.LookupEnv("TURSO_DATABASE_URL")
	token, tokenIsPresent := os.LookupEnv("TURSO_AUTH_TOKEN")

	if !urlIsPresent || !tokenIsPresent {
		log.Fatal("Database cannot be initialized without the TURSO_DATABASE_URL or TURSO_AUTH_TOKEN")
	}

	dataSourceName := fmt.Sprintf("%s?authToken=%s", url, token)

	openedDB, err := sql.Open("libsql", dataSourceName)
	if err != nil {
		log.Fatal("Error opening database", err)
	}

	db = openedDB

	createTables()
}

func createTables() {
	_, err := db.Exec("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, description TEXT, is_done BOOLEAN)")
	if err != nil {
		log.Fatal("Error creating table tasks", err)
	}
}

func getAllTasks() []Task {
	rows, err := db.Query("SELECT id, description, is_done from tasks")
	if err != nil {
		log.Fatal("Error fetching tasks", err)
	}
	defer rows.Close()

	var tasks []Task

	for rows.Next() {
		var task Task
		err := rows.Scan(&task.Id, &task.Description, &task.IsDone)
		if err != nil {
			log.Fatal("Error scanning row:", err)
		}
		tasks = append(tasks, task)
	}

	return tasks
}

func createTask(task Task) Task {
	stmt, err := db.Prepare("INSERT INTO tasks (description, is_done) VALUES(?, ?)")
	if err != nil {
		log.Fatal("Error creating task (prepare statement error)", err)
	}
	res, err := stmt.Exec(task.Description, task.IsDone)
	if err != nil {
		log.Fatal("Error creating task (execute statement error)", err)
	}
	id, _ := res.LastInsertId()
	task.Id = id
	return task
}

func loadEnvVariables() {
	file, err := os.Open(".env")
	if err != nil {
		log.Println(err)
		return
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	rows := strings.Split(string(content), "\n")

	for _, row := range rows {
		entry := strings.Split(row, "=")
		if len(entry) < 2 {
			continue
		}
		os.Setenv(strings.TrimSpace(entry[0]), strings.TrimSpace(entry[1]))
	}
}

func main() {
	loadEnvVariables()
	openDB()

	rootHandler := func(w http.ResponseWriter, r *http.Request) {
		tasks := getAllTasks()
		tmpl := template.Must(template.ParseFiles("src/templates/index.html", "src/templates/task.html"))
		tmpl.Execute(w, tasks)
	}

	createHandler := func(w http.ResponseWriter, r *http.Request) {
		title := r.PostFormValue("description")
		task := createTask(Task{Description: title, IsDone: false})
		tmpl := template.Must(template.ParseFiles("src/templates/task.html"))
		tmpl.ExecuteTemplate(w, "task", task)
	}

	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/create", createHandler)

	log.Println("Server starting on port 8081")
	log.Fatal("Failed to start server", http.ListenAndServe(":8081", nil))
}
