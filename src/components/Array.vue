<script setup lang="ts">
import type { Item } from '@/types'
import { ref, reactive, computed, onMounted } from 'vue'
import useDatabase from '@/hooks/useDatabase'

const { getAll } = useDatabase()

const keyword = ref('')
const array = reactive<Item[]>([])

onMounted(async () => {
  try {
    const all = await getAll()
    all.forEach(item => array.push(item))
  } catch (error) {
    console.error(error)
  }
})

const filtered = computed(() =>
  array.filter(item =>
    item.name.toLowerCase().includes(keyword.value.toLowerCase())
  )
)
</script>

<template>
  <article>
    <section class="header">
      <h1>已翻译的模组</h1>

      <form @submit.prevent="">
        <input v-model="keyword" type="search" name="search" />
        <label>检索</label>
      </form>
    </section>

    <ul>
      <li v-for="item in filtered">
        <figure>
          <img :src="item.cover" loading="lazy" alt="" />
        </figure>
        <section>
          <h1>
            <a
              :href="`https://steamcommunity.com/workshop/filedetails/?id=${item.id}`"
              >{{ item.name }}</a
            >
          </h1>
          <p>译者：{{ item.author }}</p>
          <p>
            更新：<time :datetime="item.date">{{ item.date }}</time>
          </p>
          <p>提交：{{ item.marker }}</p>
        </section>
      </li>
    </ul>

    <p class="end">完</p>
  </article>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  flex-direction: row;
  align-items: center;

  h1 {
    margin: 0 auto 0 0;
  }

  form {
    display: flex;
    align-items: center;
    border: 2px solid #ccc;
    padding: 0px 8px;
    border-radius: 8px;

    input {
      width: 0;
      border: none;
      outline: none;
      padding: 0;
      background-color: transparent;
      transition: 0.4s;
    }
    &:hover > input {
      width: 8em;
    }
  }
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

li {
  display: flex;
  gap: 16px;
}

figure {
  margin: 0;
  font-size: 0;

  img,
  .img {
    height: 120px;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background-color: #efefef;
  }
}

section {
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.25rem;
    margin: 0;
  }

  p {
    margin: 0;
  }
}

.end {
  transform: translateY(-16px);
}
</style>
