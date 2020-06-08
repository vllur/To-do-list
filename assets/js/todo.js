window.onload = function(){
	var form = document.getElementById("Form");
	var input = document.getElementById("Input");
	var button = document.getElementById("Button");
	var list = document.getElementById("Todo");
	var buttonClear = document.getElementById("ButtonClear");
	var id = 1;

	// listItem = {item: "todo item", checked: flase}
	var liItem = "";
	var todoList = [];

	button.addEventListener("click", addTodoItem);
	list.addEventListener("click", boxChecked);
	buttonClear.addEventListener("click", clearList);

	if(localStorage.length <= 0){
		buttonClear.style.display = "none";
	}else{
		displayList();
	}

	function addTodoItem(){
		if(input.value === ""){
			alert("You must enter some value!");
		}else{
			buttonClear.style.display = "inline";
			var text = input.value;
			var item = `<li id="li-${id}"><div class="text">${text}</div><input id="box-${id}" type="checkbox"></li>`;
			list.insertAdjacentHTML('beforeend', item);
			liItem = {item: text, checked: false};
			todoList.push(liItem);
			id++;
			addToLocalStorage()
			input.value = "";
		}
	}

	//adding string through style to list itme
	function boxChecked(event){
		const element = event.target;
		if(element.type === "checkbox"){
			element.parentNode.style.textDecoration = "line-through";
			todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString();
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}

	function addToLocalStorage(){
		if(typeof(Storage) !== "undefined"){
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("You browser doesn't support local storage!");
		}
	}

	//display all todo list
	function displayList(){
		todoList = JSON.parse(localStorage.getItem("todoList"));
		todoList.forEach(function(element){
			console.log(element.item)
			var text = element.item;
			var item = `<li id="li-${id}"><div class="text">${text}</div><input id="box-${id}" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item);
			//if we got a checked box, then style
			if(element.checked){
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});
	}

	function clearList(){
    if(confirm("Do you really want to completely clear your list?")){
      todoList = [];
  		localStorage.clear();
  		list.innerHTML = "";
  		buttonClear.style.display = "none";
    }
	}
}
