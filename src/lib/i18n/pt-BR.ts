export const ptBR = {
	app: {
		title: 'Re-zero',
		description: 'Um app de gerenciamento de tarefas baseado no sistema Resistance Zero de Mark Forster',
	},
	sync: {
		synced: 'Sincronizado',
		syncing: 'Sincronizando',
		offline: 'Offline',
		local: 'Somente local',
	},
	tasks: {
		addPlaceholder: 'Adicionar uma nova tarefa...',
		add: 'Adicionar',
		empty: 'Nenhuma tarefa ainda. Adicione uma acima.',
		dotTitle: 'Marcar esta tarefa',
		rephrase: 'Reformular',
		delete: 'Excluir',
		undotTitle: 'Desmarcar esta tarefa',
		done: 'Concluir',
		reenter: 'Reinserir',
		reenterTitle: 'Reinserir com novo texto',
		markDone: 'Marcar como concluída',
		dottedHeader: 'Tarefas marcadas',
		undotAll: 'Desmarcar todas',
	},
	header: {
		howItWorks: 'Como funciona',
		viewOnGitHub: 'Ver no GitHub',
	},
	login: {
		title: 'Entrar - Re-zero',
		subtitle: 'Entre para sincronizar entre dispositivos',
		usernamePlaceholder: 'Usuário',
		passwordPlaceholder: 'Senha',
		submit: 'Entrar',
		submitting: 'Entrando...',
		createAccount: 'Criar uma conta',
		useWithoutSync: 'Usar sem sincronização',
		invalidCredentials: 'Credenciais inválidas',
		failed: 'Falha ao entrar',
	},
	signup: {
		title: 'Criar conta - Re-zero',
		subtitle: 'Crie uma conta para sincronizar entre dispositivos',
		usernamePlaceholder: 'Usuário',
		passwordPlaceholder: 'Senha',
		confirmPasswordPlaceholder: 'Confirmar senha',
		submit: 'Criar conta',
		submitting: 'Criando conta...',
		alreadyHaveAccount: 'Já tem uma conta? Entrar',
		passwordsMismatch: 'As senhas não coincidem',
		usernameTaken: 'Nome de usuário já em uso',
		failed: 'Falha ao criar conta',
	},
	howItWorks: {
		title: 'Como o Re-zero funciona',
		backToTasks: 'Voltar às tarefas',
		whatIsTitle: 'O que é Resistance Zero?',
		whatIsText:
			'Resistance Zero (Re-zero) é um sistema de gerenciamento de tempo criado por',
		whatIsAuthor: 'Mark Forster',
		whatIsTextAfter:
			'. Ele foi projetado para reduzir gradualmente a resistência a tarefas mais difíceis à medida que as tarefas "fáceis" ao redor delas são concluídas.',
		principlesTitle: 'Princípios Fundamentais',
		principleZeroResistance:
			'Identifique Resistência Zero:',
		principleZeroResistanceText:
			' Leia sua lista de tarefas de baixo para cima. Marque qualquer tarefa que você sinta absolutamente nenhuma resistência em fazer.',
		principleBottomUp: 'Trabalhe de Baixo para Cima:',
		principleBottomUpText:
			' Execute as tarefas marcadas começando pelo final da lista.',
		principleLittleOften: '"Pouco e Frequente":',
		principleLittleOftenText:
			' Você não precisa terminar uma tarefa de uma só vez. Se sentir a resistência aumentando, pare e passe para outra tarefa.',
		principleReenter: 'Reinsira Tarefas:',
		principleReenterText:
			' Se uma tarefa não foi concluída, reescreva-a no final da lista.',
		principleRephrase: 'Reformule a Resistência:',
		principleRephraseText:
			' Se uma tarefa causa resistência consistentemente, reformule-a para ser menor, como "fazer 5 minutos de...".',
		howToUseTitle: 'Como usar este app',
		step1Title: 'Adicione tarefas:',
		step1Text:
			' Digite suas tarefas no campo de entrada no topo. Cada tarefa é adicionada ao final da lista.',
		step2Title: 'Procure resistência zero:',
		step2Text:
			' Leia sua lista de baixo para cima. Clique no círculo ao lado de qualquer tarefa que você não sinta resistência em fazer. Ela será "marcada" e moverá para a seção de marcadas.',
		step3Title: 'Trabalhe nas tarefas marcadas:',
		step3Text:
			' Na seção de marcadas, trabalhe nas tarefas. Clique em "Concluir" quando uma tarefa estiver terminada.',
		step4Title: 'Reinsira tarefas não concluídas:',
		step4Text:
			' Se você não terminou uma tarefa, clique em "Reinserir" para adicioná-la de volta ao final da lista com texto atualizado. A original é marcada como concluída.',
		step5Title: 'Reformule tarefas resistentes:',
		step5Text:
			' Se uma tarefa continua causando resistência, clique no ícone de edição para reformulá-la em algo menor ou mais acessível.',
		step6Title: 'Repita:',
		step6Text:
			' Após completar uma passada, clique em "Desmarcar todas" para resetar e escanear novamente. A lista se prioriza naturalmente conforme tarefas fáceis são concluídas e tarefas difíceis são reformuladas em partes gerenciáveis.',
		whyTitle: 'Por que funciona',
		whyText:
			'Sistemas tradicionais de tarefas pedem que você priorize. O Re-zero adota a abordagem oposta: sempre faça o que parece fácil agora. Conforme tarefas fáceis são removidas, as tarefas que antes pareciam difíceis se tornam as "mais fáceis restantes" e a resistência cai naturalmente. Reformular tarefas resistentes em passos menores reduz ainda mais a barreira. Com o tempo, tudo é feito.',
	},
} as const;

type DeepStringify<T> = {
	[K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof ptBR>;
