<template>
	<div class="todo-footer" v-show="total">
		<label>
			<!-- <input type="checkbox" @change="checkAll($event)" :checked="isAll" /> -->
			<input type="checkbox" v-model="isAll">
		</label>
		<span>
			<span>已完成{{doneTotal}}</span> / 全部{{total}}
		</span>
		<button class="btn btn-danger" v-on:click="clearAll">清除已完成任务</button>
	</div>
</template>

<script>
	export default {
		name: "TodoFooter",
		methods: {
			// checkAll(e) {
			// 	// console.log(e.target.checked);
			// 	// 想直接修改todos的值，但记住：props引入的只能读！所以要在App里写函数！
			// 	// this.todos.map((todo) => (todo.done = e.target.checked));
			// 	this.checkAllTodo(e.target.checked);
			// },
			clearAll() {
				if (confirm("确定清空所有已完成任务吗？")) {
					// this.clearAllTodo();
					this.$emit("clearAllTodo");
				}
			},
		},
		computed: {
			total() {
				return this.todos.length;
			},
			doneTotal() {
				// 对数组统计的几个方法：1、reduce迭代
				// return this.todos.reduce(
				// 	(pre, current) => (pre += current.done ? 1 : 0),
				// 	0
				// );
				// 2、filter筛选后返回长度
				return this.todos.filter((todo) => todo.done).length;
			},
			isAll: {
				get() {
					// 一个计算属性可以用其他计算属性进行再次计算
					return this.doneTotal === this.total && this.total > 0;
				},
				set(value) {
					// this.checkAllTodo(value);
					this.$emit("checkAllTodo", value);
				},
			},
		},
		// props: ["todos", "checkAllTodo", "clearAllTodo"],//不用后面两个函数了
		props: ["todos"],
	};
</script>

<style scoped>
/*footer*/
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>