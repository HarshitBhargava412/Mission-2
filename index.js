let globalStore = [];

const taskContainer = document.querySelector('.task__container');
const taskModal = document.querySelector(".task__modal__body");

const newCard = ({
	id,
	imageUrl,
	taskTitle,
	taskDescription,
	taskType,
}) => `<div class="col-md-6 col-lg-4 mb-4" id=${id} key=${id}>
  <div class="card shadow-sm">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button"
        class="btn btn-outline-success" id=${id} onclick="taskEdit.apply(this, arguments)">
        <i class="fas fa-pencil-alt" id=${id}></i>
      </button>
      <button type="button"
				id=${id}
        class="btn btn-outline-danger"
				onclick="deleteCard.apply(this, arguments)">
        <i class="fas fa-trash-alt"
				id=${id}></i>
      </button>
    </div>
    <img src=${imageUrl}
      class="card-img-top"
			style="height:270px"
      alt="...">
    <div class="card-body">
      <h5 class="card-title  trim-1-line">${taskTitle}</h5>
      <p class="card-text trim-3-lines">${taskDescription}</p>
      <span class="badge bg-primary">${taskType}</span>
    </div>
    <div class="card-footer text-muted">
      <button type="button"
        class="btn btn-outline-primary float-end"
				data-bs-toggle="modal"
				data-bs-target="#showTask"
				onclick="openTask.apply(this, arguments)"
				id=${id}>
        Open Task
      </button>
    </div>
  </div>
</div>`;

const openTaskContent = ({
	id,
	imageUrl,
	taskTitle,
	taskDescription,
}) => {
	const date = new Date(parseInt(id));
	return `<div id=${id}>
		<img src="${imageUrl}"
			alt="bg image"
			class="img-fluid mb-3" style="height:350px; width:700px;"/>
		<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
		<h2 class="my-3">${taskTitle}</h2>
		<p class="lead">${taskDescription}</p>
	</div>`;
};

const updateLocalStorage = () => {
	localStorage.setItem("tasky", JSON.stringify({
		cards: globalStore
	}));
};

const loadInitialTaskCards = () => {

	const getInitialData = localStorage.getItem("tasky");
	if (!getInitialData) return;

	const {cards} = JSON.parse(getInitialData);

	cards.map((cardObject) => {
		const createNewCard = newCard(cardObject);
		taskContainer.insertAdjacentHTML("beforeend", createNewCard)
		globalStore.push(cardObject);
	});
};

const saveChanges = (event) => {
	const taskData = {
		id: `${Date.now()}`,
		imageUrl: document.getElementById('imageurl').value,
		taskTitle: document.getElementById('tasktitle').value,
		taskType: document.getElementById('tasktype').value,
		taskDescription: document.getElementById('taskdescription').value,
	};

	const createNewCard = newCard(taskData);

	taskContainer.insertAdjacentHTML("beforeend", createNewCard);
	globalStore.push(taskData);

	updateLocalStorage();
};

const openTask = (event) => {
	if (!event) event = window.event;

	const getTask = globalStore.filter(({id}) => id === event.target.id);
	taskModal.innerHTML = openTaskContent(getTask[0]);
};

const deleteCard = (event) => {
	if (!event) event = window.event;
	const targetID = event.target.id;
	const tagname = event.target.tagName;

	globalStore = globalStore.filter(({id}) => id !== targetID);

	updateLocalStorage();

	if (tagname === "BUTTON")
		return taskContainer.removeChild(
			event.target.parentNode.parentNode.parentNode
		);

	return taskContainer.removeChild(
		event.target.parentNode.parentNode.parentNode.parentNode
	);
};
