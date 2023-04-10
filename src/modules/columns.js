import { ref } from 'vue';

export { columns, draggingCard, draggingColumn, hoveredColumn, addCard, dragStart, dragEnd, dragEnter, dragLeave, drop };

const columns = ref([
    {
        header: 'To Do',
        cards: [
            {
                header: 'Task 1',
                description: 'This is the description for task 1.',
            },
            {
                header: 'Task 2',
                description: 'This is the description for task 2.',
            },
        ],
    },
    {
        header: 'In Progress',
        cards: [
            {
                header: 'Task 3',
                description: 'This is the description for task 3.',
            },
        ],
    },
    {
        header: 'Done',
        cards: [
            {
                header: 'Task 4',
                description: 'This is the description for task 4.',
            },
            {
                header: 'Task 5',
                description: 'This is the description for task 5.',
            },
        ],
    },
]);

const draggingCard = ref(null);
const draggingColumn = ref(null);
const hoveredColumn = ref(null);

const addCard = (columnIndex) => {
    const newCard = {
        header: 'New Task',
        description: 'Add a description here.',
    };
    columns.value[columnIndex].cards.push(newCard);
};

const dragStart = (cardIndex, columnIndex, event) => {
    event.target.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify({ cardIndex, columnIndex }));
    draggingCard.value = cardIndex;
    draggingColumn.value = columnIndex;
};


const dragEnd = (event) => {
    event.target.classList.remove("dragging");
    draggingCard.value = null;
    draggingColumn.value = null;
    hoveredColumn.value = null;
};

const dragEnter = (columnIndex, event) => {
    event.preventDefault();
    hoveredColumn.value = columnIndex;
};

const dragLeave = (event) => {
    event.preventDefault();
    hoveredColumn.value = null;
};

const drop = (columnIndex, event) => {
    if (event) {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData("text/plain"));
        const { cardIndex, columnIndex: fromColumnIndex } = data;
        const draggingCard = columns.value[fromColumnIndex].cards.splice(cardIndex, 1)[0];
        columns.value[columnIndex].cards.push(draggingCard);
        event.target.classList.remove("dragging");

        draggingCard.status = columns.value[columnIndex].status;
    }
    hoveredColumn.value = null;
};
