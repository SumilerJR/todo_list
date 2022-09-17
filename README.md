# todo_list

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 问题 AND 解决方案

### 组件名称和html标签冲突

 - 问题：比如想使用Header组件名，但html里有<header>这个标签，这样的话是无法使用<Header>组件标签的使用的。
 - 解决：组件名使用多英文单词组成，这也是vue官方推荐的写法，比如我在项目里统一改为了TodoXxx，或者MyXxx，语义化即可。

### TodoItem的值（每一个todo数据）如何存放

 - 问题：每一个todo里的基本信息为：id、标题、状态，如何存放（假数据）合理呢
 - 解决：使用对象数组的形式，即数组里面存一个一个的todo对象，该数组为todos，而对象统一为{ id: "xxx", title: "xxx", done: true }

### TodoList里动态的TodoItem数据

 - 问题：TodoItem的数据应该是动态的
 - 解决：使用v-for遍历输出，其中key应为唯一值id，遍历对象为上述的数组todos
```vue
<TodoItem v-for="todoObj in todos" :key='todoObj.id' :todo="todoObj"></TodoItem>
```

### TodoList传数据到TodoItem

 - 问题：TodoList的data里的todos的数据如何传给TodoItem让其显示（html标签在TodoItem里，需要在TodoItem里配置）
 - 解决：使用props配置项，props功能：让组件接收外部传过来的数据
如上述v-for里写的一般，*:todo="todoObj"*，传入了数组里的每一个todo对象，加冒号是需要进行解析，否则传入的只是字符串"todoObj"
然后在TodoItem里接收数据，*props: ['todo']*

### TodoHeader里input框的值，需要输入后回车进行添加todo

 - 问题：input的值如何获取
 - 解决：有两个方法获取input框输入的值：
1. 如此用keydown绑定键盘事件，然后用参数event里触发事件的元素target可以获取到input，然后value就是要的值。
2. 借用一个data，比如title，然后在input框里添加向绑定的值，然后在add函数里使用this.title即可获取值

### 父组件往子组件可以用props，子组件往父组件使用什么传输数据？

- 问题：TodoHeader里input的值取到了，如何用add函数添加到TodoList里的data的todos数组里呢
- 解决1：把todos数组放到app里，然后两个子组件都从app操作数据即可
  在app里传入一个函数addTodo到TodoHeader，TodoHeader里接收，然后在add函数里传入参数到addTodo，即可实现数据从子组件到父组件的实现

- 解决2：通过自定义事件，在父组件里给子组件实例对象的标签上写入自定义事件，然后在子组件里使用$emit触发事件，也可以实现子组件往父组件传数据
  即在原来使用父组件利用props往子组件传函数然后子组件传实参调用函数的“捞数据”的形式，都可以改为给子组件添加自定义事件，然后在子组件中触发自定义事件从而调用到父组件里的回调函数，数据在触发时传输。

- 解决3：全局事件总线（任意组件间通信）

### 点击勾选框修改done的值取反

 - 问题1：点击勾选框后，不仅需要勾选和不勾选之间切换，在app里的数据也需要被修改到
 - 解决：在TodoItem的勾选框里添加一个函数
```vue
@change="handleCheck(todo.id)"
//或
@click="handleCheck(todo.id)"
```
并且定义handleCheck函数，用小括号可以进行传参，然后在handleCheck里调用App里的函数checkTodo，并且把id作为参数传进去

- 注：因为数据是在App里的，所以对数据的操作也应该由App完成，即“数据在谁那，谁操作数据”，而这里引申出第二个问题
- 问题2：怎么把TodoItem的数据交给App进行修改呢
- 解决：在App里定义函数checkTodo，这里的关系结构是：App->TodoList->TodoItem，也就是TodoItem是App的“孙子”，和上一个问题是一样的做法，只不过由于隔了“两代”，需要传两次，即：App往TodoList里传入->TodoList接收，并往TodoItem里传入->TodoItem接收，并在自己的函数内调用接收的函数，且传入实参->App的函数被调用，形参接收到TodoItem的数据，进行操作。从而实现了子组件、甚至孙子组件操作父组件的数据

### TodoFooterlid里全选按钮的实现

 - 问题1：全选按钮是checkbox的输入框，值有true和false两种，如何获取到值？

 - 解决1：定义一个flag，初始化为false，然后给带全选按钮添加点击事件，每次进行flag = !flag的操作。
   
   - 问题：这样的flag不严谨，1是flag和全选按钮之间没什么联系，2是在手动点击单个选项选择时，无法自动判断为是否已全选
   - 解决：使用计算属性，在此之前分别有两个计算属性计算了todo的总数和已完成的数，那么在这里只需要判断两者是否相等即可（同时要保证大于0）
   
   ```vue
   isAll() {
   	// 一个计算属性可以用其他计算属性进行再次计算
   	return this.doneTotal === this.total && this.total > 0;
   },
   ```
   
 - 解决2：在点击事件时传入$event实参，并在函数里定义形参e，即可在函数里通过e.target.checked获取到输入框是否勾选(true/false)

 - 注：vue 事件绑定函数加括号和不加括号的区别 https://blog.csdn.net/weixin_56008510/article/details/121948791
   1. 不加圆括号不传实参时会默认传入一个$event实参
   2. 加了圆括号手动传实参时将不会自动传入$event实参，但可以自己手动传入

 - 问题2：页面按钮的全选与否实现之后，需要让vue的值也跟着更改

 - 解决：定义了一个函数并添加点击事件，通过计算属性isAll的值进行遍历todos给每一个todo.done赋值

 - 注：需要注意的是想直接修改todos的值，但记住：props引入的只能读！所以要在App里写函数！
所以不能直接写成// this.todos.map((todo) => (todo.done = e.target.checked));
而是需要在App里写该实现（数据todos是App的），然后通过props传给TodoFooter，再进行函数的调用

### 本地存储

 - 问题：现在的数据是死的，除了数据库还能怎样存储呢
 - 解决：使用localStorage进行本地存储，使用watch监视属性对todos进行监视，每当todos变化时，都执行localStorage.setItem("todos", JSON.stringify(value));把数据存入本地存储中
 - 注1：todos初始化为todos: JSON.parse(localStorage.getItem("todos")) || [],是当第一次访问时没有本地存储的话JSON.parse()会返回null，此时若不处理会在TodoFooter里报错（使用了todos.length属性），因此需要使用>> || [] 进行特情情况的处理
 - 注2：在勾选时由于是修改了对象内的值，所以watch不能用简写形式（会监视不到修改了），需要配置deep:true

