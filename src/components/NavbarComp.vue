<template>
  <div>
    <div class="container mx-auto">
      <div class="flex justify-between py-5">
        <div class="flex items-center py-1 px-2 rounded-md bg-white">
          <i class="fas fa-map-marker-alt text-bluee"></i>
          <select name="" id="">
            <option value="">Алматы</option>
            <option value="">Астана</option>
            <option value="">Павлодар</option>
            <option value="">Актобе</option>
          </select>
        </div>
        <div class="bg-orangee p-2 rounded-md flex items-center">
          <i class="fas fa-phone-alt text-yellou"></i>
          <p class="mx-3 text-yellou">Горячая линия с 08:00 до 00:00</p>
          <a class="text-lg font-semibold" href="tel:1717">1717</a>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="flex items-center justify-between container mx-auto py-2">
        <router-link to="/">
          <img
            src="https://www.technodom.kz/images/global/logo_technodom.svg"
            alt=""
          />
        </router-link>
        <div
          class="
            bg-oran
            py-2
            px-3
            text-white
            rounded-md
            flex
            items-center
            text-sm
          "
        >
          <i class="fa-solid fa-list mr-3"></i>
          <p @click="changeKatalog()" class="font-semibold">Каталог</p>
        </div>
        <div class="w-1/3 relative">
          <input
            placeholder="Я хочу найти"
            class="w-full border border-oran rounded-lg py-3 px-3"
            type="text"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="flex text-center">
          <div class="mx-3 hover:text-oran hover:cursor-pointer">
            <i class="fa-solid fa-heart"></i>
            <p class="text-yellou">Избранное</p>
          </div>
          <div class="mx-3">
            <router-link :to="{ name: 'compare' }">
              <i class="fa-solid fa-scale-unbalanced"></i>
              <p class="text-yellou">Сравнить</p>
            </router-link>
          </div>
          <div class="mx-3 relative">
            <div class="relative" @click="changeCart()">
              <i class="fa-solid fa-cart-shopping"></i>
              <p class="text-yellou">Корзина</p>
              <p class="counter">{{ counterStatus }}</p>
            </div>
            <div v-if="showCart === 1" class="cart-list">
              <div
                class="flex my-2 items-center justify-between"
                v-for="(product, index) of cartProducts"
                :key="product.id"
              >
                <img class="w-14 h-14" :src="product.images[0].first" alt="" />
                <p class="text-xs text-left ml-2">{{ product.title }}</p>
                <p class="text-lg font-semibold">{{ product.price }}</p>
                <p @click="removeItem(index)" class="ml-3 hover:cursor-pointer mr-5"><i class="fa-solid fa-xmark text-red-500"></i></p>
              </div>
              <p>Итого: {{ totalPrice }}</p>
              <div class="flex justify-between items-center">
                <p>Перейти в корзину</p>
                <p @click="sendRequest()">Очистить корзину</p>
              </div>
            </div>
          </div>
          <div v-if="currentUser != null" class="mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fa-solid fa-user"></i>
            <p class="text-yellou">{{ currentUser.name }}</p>
          </div>
          <div v-if="currentUser == null" class="mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fa-solid fa-user"></i>
            <p class="text-yellou">Вход</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button @click="changeButton = 1" :class="{ 'border-oran text-oran' : changeButton === 1}" class="w-full py-2 rounded-lg text-lg border mr-1">Вход</button>
            <button @click="changeButton = 2" :class="{ 'border-oran text-oran' : changeButton === 2}" class="w-full py-2 rounded-lg text-lg border ml-1">Регистрация</button>
          </div>
          <div class="modal-body">
            <form v-if="changeButton === 1" action="">
              <div v-if="loginStatus === 2" class="bg-red-500 rounded-lg p-4 w-full text-lg text-white font-semibold">
                <p>Введенные данные неверны</p>
              </div>
              <div v-if="loginStatus === 1" class="bg-green-500 rounded-lg p-4 w-full text-lg text-white font-semibold">
                <p>Вы успешно вошли!</p>
              </div>
              <input v-model="form.email" class="border p-2 w-full block rounded-md my-4" placeholder="Email" type="text">
              <input v-model="form.password" class="border p-2 w-full block rounded-md my-4" placeholder="Пароль" type="password">
              <p @click="checkUser()" class="hover:cursor-pointer bg-oran rounded-lg w-full text-center py-2 text-white uppercase font-semibold">Войти</p>
            </form>
            <form v-if="changeButton === 2" action="">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Имя" type="text">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Фамилия" type="text">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Email" type="text">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Номер телефона" type="number">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Пароль" type="password">
              <input class="border p-2 w-full block rounded-md my-4" placeholder="Подтвердите пароль" type="password">
              <p class="hover:cursor-pointer bg-oran rounded-lg w-full text-center py-2 text-white uppercase font-semibold">Регистрация</p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="block w-full text-center text-sm" data-bs-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showKatalog === 1" class="w-full bg-white absolute z-50">
      <div class="container mx-auto py-6">
        <div class="flex items-center">
          <div class="block w-1/5 mr-6 border-r">
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-bars mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Все категории</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-mobile-alt mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Смартфоны и гаджеты</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-desktop mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Ноутбуки и компьютеры</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-desktop mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Всё для геймеров</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-desktop mr-4 text-gray-400"></i>
                <p class="hover:text-oran">ТВ, аудио и музыкальные инструменты</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-camera mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Фототехника и квадракоптеры</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-blender mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Бытовая техника</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-blender mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Техника для кухни</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-palette mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Красота и здоровье</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-car mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Спорт, туризм, багаж</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-car mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Автотовары и транспорт</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-child mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Детские товары</p>
            </div>
            <div class="flex items-center text-xl my-2">
              <i class="fas fa-home mr-4 text-gray-400"></i>
                <p class="hover:text-oran">Товары для дома и сада</p>
            </div>
          </div>
          <div class="aoao overflow-y-scroll flex">
            <div class="flex mr-6">
              <div class="text-lg w-2/5">
              <h1 class="text-xl font-semibold my-2">Смартфоны и телефоны</h1>
              <p>Смартфоны</p>
              <p>Смартфоны Apple</p>
              <p>Смартфоны Samsung</p>
              <p>Смартфоны Huawei</p>
              <p>Смартфоны Xiaomi</p>
              <p>Смартфоны Oppo</p>
              <p>Смартфоны Vivo</p>
              <p>Смартфоны Poco</p>
              <p>Мобильные телефоны</p>
              <p>Радиотелефоны DECT</p>
              <h1 class="text-xl font-semibold mt-4 mb-2">Планшеты и электронные книги</h1>
              <p>Планшеты</p>
              <p>Планшеты Samsung</p>
              <p>Планшеты Apple iPad</p>
              <p>Аксессуары для iPad</p>
              <p>Чехлы для планшетов</p>
              <p>Аксессуары для планшетов</p>
              <p>Электронные книги</p>
              <h1 class="text-xl font-semibold mt-4 mb-2">Программное обеспечение</h1>
              <p>Антивирусы и безопасность для смартфонов</p>
              <p>Офисные программы для смартфонов</p>
              <p>Учеба и развитие для смартфонов</p>
              <p>Цифровой контент для смартфонов</p>
              <p>Удаленный сервис для смартфонов</p>
            </div>
            <div class="text-lg w-2/5">
              <h1 class="text-xl font-semibold mt-4 mb-2">Гаджеты</h1>
              <p>Смарт часы</p>
              <p>Apple Watch</p>
              <p>Смарт часы Huawei</p>
              <p>Смарт часы Xiaomi</p>
              <p>Аксессуары для смарт часов</p>
              <p>Фитнес браслеты</p>
              <p>Детские часы с GPS</p>
              <p>Экшн-камеры</p>
              <p>Аксессуары для экшн камер</p>
              <p>Bluetooth-трекер</p>
              <h1 class="text-xl font-semibold mt-4 mb-2">Аксессуары для телефонов</h1>
              <p>Портативное аудио</p>
              <p>Внешние аккумуляторы</p>
              <p>Чехлы</p>
              <p>Защита экрана</p>
              <p>Карты памяти</p>
              <p>Зарядные устройства</p>
              <p>Кабели и адаптеры для смартфонов</p>
              <p>Мобильная оптика</p>
              <p>Аксессуары для экшн камер</p>
              <p>Подставки</p>
              <p>Селфи моноподы</p>
              <p>Стабилизаторы (Стедикамы)</p>
              <p>Стилусы</p>
            </div>
            <div class="text-lg w-2/5">
              <h1 class="text-xl font-semibold mt-4 mb-2">Наушники</h1>
              <p>AirPods</p>
              <p>Наушники Xiaomi</p>
              <p>Беспроводные</p>
              <p>Проводные</p>
              <p>Все наушники</p>
              <h1 class="text-xl font-semibold mt-4 mb-2">Умный дом</h1>
              <p>Умный дом Xiaomi</p>
              <p>Управление для умного дома</p>
              <p>Пульты управления для умного дома</p>
              <p>Умные лампы</p>
              <p>Умные розетки</p>
              <p>Датчикиы</p>
              <p>Яндекс (Алиса)</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="w-full h-screen" :class="{ 'bg-opa': showKatalog == 1 }"></div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NavbarComp",
  data() {
    return {
      showKatalog: 0,
      showCart: 0,
      changeButton: 1,  
      currentUser: null,
      loginStatus: 0,
      form: {
        email: '',
        password: ''
      }
    };
  },
  computed: mapGetters(["cartProducts", "counterStatus", "totalPrice", "allUsers"]),
  methods: {
    ...mapActions(['removeAll', 'removeSingleProduct', 'fetchUsers']),
    changeCart() {
      if(this.showCart === 0) {
        this.showCart = 1
      } else {
        this.showCart = 0
      }
    },
    changeKatalog() {
      if(this.showKatalog === 0) {
        this.showKatalog = 1
      } else {
        this.showKatalog = 0
      }
    },
    sendRequest() {
      this.removeAll();
    },
    removeItem(id) {
      this.removeSingleProduct(id);
    },
    checkUser() {
      for(let i = 0; i <= this.allUsers.length; i++) {
        if(this.allUsers[i].email === this.form.email && this.allUsers[i].password === this.form.password) {
          this.currentUser = this.allUsers[i];
          this.loginStatus = 1
        } else if( this.currentUser != null ) {
          this.loginStatus = 1
        } else {
          this.loginStatus = 2
        }
      }
    }
  },
  async mounted() {
    this.fetchUsers()
  }
};
</script>

<style scoped>
  @import url("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
</style>