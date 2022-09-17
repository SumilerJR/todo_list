<template>
	<div class="todo-header">
		<input type="text" placeholder="请输入你的任务名称，按回车键确认" @keydown.enter="add" v-model="title" />
	</div>
</template>

<script>
	// nanoid是类似uuid的比较简洁的一个库，可以生成全球唯一的一个id
	import { nanoid } from "nanoid";
	export default {
		name: "TodoHeader",
		data() {
			return {
				title: "",
			};
		},
		methods: {
			// 有两个方法获取input框输入的值：
			// 1.如此用keydown绑定键盘事件，然后用参数event里的触发事件的元素target可以获取到input，然后value就是需要的值。
			// 2.借用一个data，比如title，然后在input框里添加双向绑定的值，然后在add函数里使用this.title即可获取该值
			add() {
				if (!this.title.trim()) return alert("不能添加空事件");
				// console.log(event.target.value);
				// 将用户的输入包装成为一个todo对象
				const todoObj = {
					id: nanoid(),
					title: this.title,
					done: false,
				};
				// this.addTodo(todoObj);//使用自定义事件给父组件App传数据，不需要调用啦
				this.$emit("addTodo", todoObj); //触发自定义事件！
				// console.log(todoObj);
				this.title = "";
			},
		},
		// props: ["addTodo"],//使用自定义事件给父组件App传数据，不需要接收啦
	};
</script>

<style scoped>
/*header*/
.todo-header input {
	width: 560px;
	height: 28px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 4px 7px;
}

.todo-header input:focus {
	outline: none;
	border-color: rgba(82, 168, 236, 0.8);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
		0 0 8px rgba(82, 168, 236, 0.6);
}
</style>