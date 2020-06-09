window.onload = function(){
	var form = document.getElementById("Form");
	var input = document.getElementById("Input");
	var button = document.getElementById("Button");
	var list = document.getElementById("Todo");
	var buttonClear = document.getElementById("ButtonClear");
	var id = 1;

	var liItem = "";
	var todoList = [];

	button.addEventListener("click", addTodoItem);
	list.addEventListener("click", boxChecked);
	list.addEventListener("click", deleteItem);
	buttonClear.addEventListener("click", clearList);

	input.addEventListener("keyup", function(event){
		if(event.key === "Enter"){
			addTodoItem();
		}
	})

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
			var item = `<li id="li-${id}"><div class="text">${text}</div><div class="controls"><i id="del-${id}" class="icon-trash"></i><input id="box-${id}" type="checkbox"></div></li>`;
			list.insertAdjacentHTML('beforeend', item);
			liItem = {item: text, checked: false};
			todoList.push(liItem);
			id++;
			addToLocalStorage()
			input.value = "";
		}
	}

	function boxChecked(event){
    if(event.target.type == "checkbox"){
			var textStyle = event.target.parentNode.parentNode.style.textDecoration;
		  todoList = JSON.parse(localStorage.getItem("todoList"));
	  		if(textStyle === "none" || textStyle === ""){
	  			event.target.parentNode.parentNode.style.textDecoration = "line-through";
	  			todoList[event.target.id.split('-')[1]-1].checked = true;
	  		}else{
	        event.target.parentNode.parentNode.style.textDecoration = "none";
	        todoList[event.target.id.split('-')[1]-1].checked = false;
	      }
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

	function deleteItem(event){
		if(event.target.classList.contains("icon-trash")){
			var id = Number(event.target.id[4]) - 1;
			todoList = JSON.parse(localStorage.getItem("todoList"));
			if(event.target.className == "icon-trash"){
		    if(confirm("Do you really want to delete this note?")){
		      todoList.splice(id, 1);
		    }

			localStorage.setItem("todoList", JSON.stringify(todoList));

			if(!(Array.isArray(todoList) && todoList.length)){
				todoList = [];
	  		localStorage.clear();
	  		buttonClear.style.display = "none";
			}
			list.innerHTML = "";
			location.reload();
			displayList();
			}
		}
	}

	function displayList(){
		todoList = JSON.parse(localStorage.getItem("todoList"));

		todoList.forEach(function(element){
  		var text = element.item;
  		var item = `<li id="li-${id}"><div class="text">${text}</div><div class="controls"><i id="del-${id}" class="icon-trash"></i><input id="box-${id}" type="checkbox"></div></li>`;
  		list.insertAdjacentHTML("beforeend", item);

  		if(element.checked == true){
  			var li = document.getElementById("li-"+id);
  			li.style.textDecoration = "line-through";
  			li.childNodes[1].childNodes[1].checked = true;
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
