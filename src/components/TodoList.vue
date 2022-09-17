<template>
	<ul class="todo-main">
		<!-- item 用props传todoObj对象到TodoItem组件里，这里需要加冒号，不然传过去的只是字符串"todoObj" -->
		<TodoItem v-for="todoObj in todos" :key='todoObj.id' :todo="todoObj" :checkTodo="checkTodo" :deleteTodo="deleteTodo"></TodoItem>
	</ul>
</template>

<script>
	import TodoItem from "./TodoItem.vue";

	export default {
		name: "TodoList",
		components: {
			TodoItem,
		},
		// data() {
		// 	return {
		// 		todos: [
		// 			{ id: "001", title: "吃饭", done: true },
		// 			{ id: "002", title: "睡觉", done: true },
		// 			{ id: "003", title: "开车", done: false },
		// 		],
		// 	};
		// },
		props: ["todos", "checkTodo", "deleteTodo"],
	};
</script>

<style scoped>
/*main*/
.todo-main {
	margin-left: 0px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding: 0px;
}

.todo-empty {
	height: 40px;
	line-height: 40px;
	border: 1px solid #ddd;
	border-radius: 2px;
	padding-left: 5px;
	margin-top: 10px;
}
</style>