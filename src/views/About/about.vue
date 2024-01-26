<template>
  <div>
    <h1 class="text-[32px] text-center font-bold">Foydalanuvchilar</h1>
    <table
      class="table-autop-2 mt-[30px] rounded-[20px] sm:w-full *:dark:text-gray-900"
    >
      <thead class="">
        <tr class="*:border-2 *:border-black">
          <th class="text-[20px] font-bold italic py-[10px]">Foydalanuvchi</th>
          <th class="text-[20px] font-bold italic">F.I.O</th>
          <th class="text-[20px] font-bold italic">Gmail</th>
          <th class="text-[20px] font-bold italic">Vaqti</th>
        </tr>
      </thead>
      <tbody class="">
        <tr
          v-for="item in users"
          :key="item.id"
          class="odd:bg-gray-400 even:bg-white even:text-gray-500 hover:bg-blue-500 hover:text-white duration-[0.5s] *:border-2 *:border-black"
        >
          <td class="italic px-[20px] py-[7px] cursor-pointer">
            {{ item?.username }}
          </td>
          <td class="italic px-[20px] py-[7px] cursor-pointer">
            {{ item?.first_name }} {{ item?.last_name }}
          </td>
          <td class="italic px-[20px] py-[7px] cursor-pointer">
            {{ item?.email }}
          </td>

          <td class="italic px-[20px] py-[7px] cursor-pointer">
            {{ item?.date_joined }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      users: [],
    };
  },

  methods: {
    getAllUsers() {
      axios
        .get("https://mycorse.onrender.com/https://trustcheck.pythonanywhere.com/api/get-all-user", {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
          },
          auth: {
            username: "admin",
            password: "1",
          },
        })
        .then((res) => {
          console.log(res);
          Swal.mixin({
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          }).fire({
            icon: "success",
            title: "Muvaffaqiyatli",
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.mixin({
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          }).fire({
            icon: "error",
            title: "Ma'lumot kiriting",
          });
        });
    },
  },
  created() {
    this.getAllUsers();
  },
};
</script>
  