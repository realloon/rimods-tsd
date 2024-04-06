<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import useDatabase from '@/hooks/useDatabase'

const dialogRef = ref()

const isShow = ref(false)

const id = ref('')
const name = ref('')
const cover = ref('')
const author = ref('')
const date = ref('')
const isAuthor = ref(true)
const marker = ref('')

const { add } = useDatabase()

async function handle() {
  try {
    await add({
      id: id.value,
      name: name.value,
      cover: cover.value,
      author: author.value,
      date: date.value,
      marker: marker.value,
    })
    isShow.value = false
  } catch (error: any) {
    if (error.code === '23505') {
      alert('数据库中已有该模组')
    } else {
      console.error(error)
    }
  }
}

function close() {
  const dialog = <HTMLDialogElement>dialogRef.value
  dialog.close()
  requestAnimationFrame(() => {
    dialog.close() // handle 'not focusable' error.
  })
}

onMounted(() => {
  const dialog = <HTMLDialogElement>dialogRef.value
  dialog.onclose = () => {
    isShow.value = false
  }
})

watch(isShow, () => {
  const dialog = <HTMLDialogElement>dialogRef.value
  dialog.showModal()
})
</script>

<template>
  <button @click="isShow = true" class="add-btn">+</button>

  <dialog ref="dialogRef">
    <form @submit.prevent="handle">
      <header>提交模组汉化记录</header>
      <fieldset>
        <legend>原模组信息</legend>
        <!-- id -->
        <label>
          <input
            v-model="id"
            placeholder="模组在创意工坊的 ID"
            name="id"
            type="number"
            required
          />
          <span>ID</span>
        </label>
        <!-- name -->
        <label>
          <input
            v-model="name"
            placeholder="模组在创意工坊的名称"
            name="name"
            type="text"
            required
            pattern="[a-zA-Z\W]+"
          />
          <span>名称</span>
        </label>
        <!-- cover -->
        <label>
          <input
            v-model="cover"
            placeholder="模组的封面图链接"
            name="cover"
            type="url"
            required
          />
          <span>封面</span>
        </label>
      </fieldset>

      <fieldset>
        <legend>译者信息</legend>
        <!-- author -->
        <label>
          <input
            v-model="author"
            placeholder="译者姓名"
            name="author"
            type="text"
            required
            pattern="[a-zA-Z\W]+"
          />
          <span>译者</span>
        </label>

        <label>
          <input v-model="date" name="date" type="date" required />
          <span>日期</span>
        </label>
        <!-- isAuthor -->
        <label class="is-author">
          <span>是否为译者本人</span>
          <input v-model="isAuthor" type="checkbox" />
        </label>
        <!-- marker -->
        <label v-show="!isAuthor">
          <input
            v-model="marker"
            placeholder="你的姓名"
            name="marker"
            type="text"
            :required="!isAuthor"
          />
          <span>提交者</span>
        </label>
      </fieldset>

      <div class="btns">
        <button @click="close">取消</button>
        <button type="submit">提交</button>
      </div>
    </form>
  </dialog>
</template>

<style scoped>
dialog {
  width: 100%;
  max-width: 24em;
  padding: 24px;
  border-radius: 16px;
}
dialog::backdrop {
  background-color: #ffffffb3;
}

.add-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-family: monospace;
  font-size: 20px;
  color: gray;
  padding: 0;
  transition: 0.2s;

  &:hover {
    color: black;
    border-color: black;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

fieldset {
  margin: 0;
  padding: 0;
  border: 0;
  /*  */
  display: flex;
  flex-direction: column;
  gap: 8px;
}

header {
  color: var(--theme);
  font-weight: bold;
  text-align: center;
}

legend {
  padding: 0;
  color: #666;
  font-weight: bold;
  margin-bottom: 0.25em;
}

label {
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  transition: 0.4s;

  &:has(input:focus-within) {
    border-color: var(--theme);
  }

  input {
    flex-grow: 1;
    border: none;
    padding: 0;
    outline: none;

    &:invalid {
      color: red;
    }

    &[type='date'] {
      flex-grow: 0;
      margin-right: auto;
    }

    &[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;
    }
    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }

  span {
    width: 4em;
    text-align: right;
  }
}

.btns {
  display: flex;
  gap: 16px;

  button {
    flex-grow: 1;
  }
}

label.is-author {
  width: fit-content;
  padding-left: 0;
  border-color: transparent;
  gap: 8px;
  span {
    width: unset;
    text-align: left;
  }
  input {
    flex-grow: 0;
  }

  &:has(input:focus-within) {
    border-color: transparent;
  }
}

button {
  padding: 0.3em 1em;
  border: 2px solid #888;
  background-color: transparent;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
