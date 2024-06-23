package main

import (
	"html/template"
	"log"
	"net/http"
)

type Task struct {
	Id     int
	Title  string
	IsDone bool
}

func main() {
	log.Print("Server started")

	tasks := []Task{
		{Id: 1, Title: "Task 1 blablabla", IsDone: true},
		{Id: 2, Title: "Task 2 bleblebl", IsDone: false},
		{Id: 3, Title: "Task 3 kjfdhgkjhdfg", IsDone: false},
	}

	rootHandler := func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("src/templates/index.html", "src/templates/task.html"))
		tmpl.Execute(w, tasks)
	}

	createHandler := func(w http.ResponseWriter, r *http.Request) {
		title := r.PostFormValue("title")
		task := Task{Id: 4, Title: title, IsDone: false}
		tmpl := template.Must(template.ParseFiles("src/templates/task.html"))
		tmpl.ExecuteTemplate(w, "task", task)
	}

	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/create", createHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
