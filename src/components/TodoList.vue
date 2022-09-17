<template>

	<ul class="todo-main">
		<transition-group name="todo" appear>
			<!-- item 用props传todoObj对象到TodoItem组件里，这里需要加冒号，不然传过去的只是字符串"todoObj" -->
			<TodoItem v-for="todoObj in todos" :key='todoObj.id' :todo="todoObj"></TodoItem>
		</transition-group>
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
		// 		todos: JSON.parse(localStorage.getItem("todos")) || [],
		// 	};
		// },
		// props: ["todos", "checkTodo", "deleteTodo"],//后面两个不需要经过List传给Item了，利用全局事件总线进行数据传输
		props: ["todos"],
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

.todo-enter-active {
	animation: atguigu 0.5s linear;
}

.todo-leave-active {
	animation: atguigu 0.5s linear reverse;
}

@keyframes atguigu {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0px);
	}
}
</style>