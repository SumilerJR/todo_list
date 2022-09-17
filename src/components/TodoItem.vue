<template>

	<li :class="checked">
		<label>
			<!-- 动态设置checked，这里值直接由todo.done决定，不用插值语法 -->
			<input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
			<!-- handleCheck另一张写法：直接用v-model进行todo.done的双向绑定，可以实现，但是不推荐，因为props的只读的，不应该修改它的值，这里可以修改且不报错是因为todo是一个对象，是引用类型，数据改变监视不到-->
			<!-- <input type="checkbox" v-model="todo.done" /> -->
			<span v-show="!todo.isEdit">{{todo.title}}</span>
			<input type="text" :value="todo.title" v-show="todo.isEdit" @blur="handleBlur(todo, $event)" @keydown.enter="handleBlur(todo, $event)" ref="inputTitle">
		</label>
		<button class="btn btn-normal" v-show='!todo.isEdit' @click="handleEdit(todo, $event)">编辑</button>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
	</li>
</template>

<script>
	export default {
		name: "TodoItem",
		// 声明接收todo对象
		// props: ["todo", "checkTodo", "deleteTodo"],//后面两个不需要经过List传给Item了，利用全局事件总线进行数据传输
		props: ["todo"],
		computed: {
			checked() {
				return this.todo.done ? "checked" : "";
			},
		},
		methods: {
			//勾选or取消勾选
			handleCheck(id) {
				// 通知App组件将对应的todo对象的done取反
				// console.log(id);
				// this.checkTodo(id);
				// 使用全局事件总线触发App里定义的事件，把数据传过去
				this.$bus.$emit("checkTodo", id);
			},
			//删除
			handleDelete(id) {
				// confirm和alert的区别：弹出框有确认和取消的按钮，确认返回ture，取消返回false
				// if (confirm("确定删除吗？")) {
				// 	// console.log(id);
				// 	this.deleteTodo(id);
				// }
				// this.deleteTodo(id);
				// 使用全局事件总线触发App里定义的事件，把数据传过去
				this.$bus.$emit("deleteTodo", id);
			},
			//编辑
			handleEdit(todo, event) {
				if (todo.hasOwnProperty("isEdit")) {
					todo.isEdit = true;
				} else {
					this.$set(todo, "isEdit", true);
				}

				// setTimeout(() => {
				// 	this.$refs.inputTitle.focus();
				// }, 200);

				//在下一次 DOM 更新结束后执行其指定的回调。
				this.$nextTick(() => {
					this.$refs.inputTitle.focus();
				});
			},
			//失去焦点（真正执行修改逻辑）
			handleBlur(todo, event) {
				todo.isEdit = false;
				if (!event.target.value.trim()) {
					return alert("输入不能为空！");
				}
				this.$bus.$emit("updateTodo", todo.id, event.target.value);
			},
		},
	};
</script>

<style scoped>
/*item*/
li {
	position: relative;
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

/* li button {
	float: right;
	display: none;
	margin-top: 3px;
	margin-left: 5px;
} */

li button.btn-normal {
	position: absolute;
	right: 70px;
	display: none;
	margin-top: 3px;
	margin-left: 5px;
}

li button.btn-danger {
	position: absolute;
	right: 5px;
	display: none;
	margin-top: 3px;
	margin-left: 5px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}

li.checked span {
	text-decoration-line: line-through;
	color: #ccc;
	/* border-bottom: 1px solid #ddd; */
}
</style>