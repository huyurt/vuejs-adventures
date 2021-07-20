<template>
  <div class="mb-4">
    <h1>{{ about.title }}</h1>
    <h2>{{ about.subTitle }} {{ version }}</h2>
  </div>
  <form @submit.prevent="addNewTodo">
    <div class="mb-5">
      <label for="newTodo" class="form-label">Yeni Todo</label>
      <input
          class="form-control"
          id="newTodo"
          placeholder="Neler düşünüyorsun?"
          v-model="newTodo"
          name="newTodo"
      />
      <div class="m-2">
        <button type="submit" class="btn btn-primary">Yeni Todo Ekle</button>
      </div>
      <div class="m-2">
        <button type="button" class="btn btn-danger" @click="removeAllTodos">Tümünü Sil</button>
      </div>
      <div class="m-2">
        <button type="button" class="btn btn-success" @click="markAllDone">Tümünü Tamamlandı Yap</button>
      </div>
    </div>
  </form>
  <div v-if="todos.length === 0">
    <h3>Liste boş...🥺</h3>
  </div>
  <div v-else>
    <ul class="list-group">
      <li class="list-group-item d-flex flex-row justify-content-between align-items-center"
          v-for="(todo, index) in todos"
          :key="todo.id">
        <h3
            :class="{mark: todo.done}"
            style="cursor: pointer"
            @click="toggleDone(todo)"
        >
          {{ todo.content }}
        </h3>
        <button
            type="button"
            class="btn btn-warning"
            @click="removeTodo(index)"
        >
          ✔ Tamamlandı Yap & Sil
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, onMounted} from "vue";
import {v4 as uuidv4} from "uuid";
import {TodoModel} from "@/models/todoModel";

type Props = {
  title: string;
  subTitle: string;
};
export default defineComponent({
  name: "TodoForm",
  props: {
    about: {
      type: Object as PropType<Props>,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const version = ref("v1");
    const newTodo = ref("");

    const todos = ref<TodoModel[]>([]);

    function addNewTodo(): void {
      if (!newTodo.value) {
        return;
      }

      todos.value.push({
        id: uuidv4(),
        done: false,
        content: newTodo.value,
      });

      newTodo.value = "";
    }

    function toggleDone(todo: TodoModel): void {
      todo.done = !todo.done;
    }

    function removeTodo(index: number): void {
      todos.value.splice(index, 1);
    }

    function markAllDone(): void {
      todos.value.forEach((todo) => (todo.done = true));
    }

    function removeAllTodos(): void {
      todos.value = [];
    }

    onMounted(() => console.log(props.about.title, props.about.subTitle));

    return {version, todos, newTodo, addNewTodo, toggleDone, removeTodo, markAllDone, removeAllTodos};
  },
});
</script>

<style scoped>
.mark {
  text-decoration: line-through;
}
</style>