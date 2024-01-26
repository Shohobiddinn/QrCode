<template>
  <div>
    <div
      v-if="false"
      class="flex flex-col max-h-[200px] overflow-x-scroll border-[3px] border-blue-500 mt-[100px]"
      @scroll="scroll($event)"
    >
      <div
        class="item text-[40px] text-center font-bold"
        v-for="item in 20"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="false">
      <div class="container">
        <div class="flex justify-center items-center flex-col h-[100vh]">
          <h1 class="text-[30px] font-bold mb-[20px]">Ma'lumot kiriting</h1>
          <div class="flex flex-col w-1/2 max-[600px]:w-full">
            <div class="w-full">
              <textarea
                class="border-[3px] border-blue-700 rounded-[12px] w-full outline-none outline-[4px] p-[20px] duration-[0.3s] text-[20px] font-medium"
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Matn kiriting..."
                v-model="text"
              ></textarea>
            </div>
            <div
              class="w-full border-[3px] border-blue-700 rounded-[12px] min-h-[250px] overflow-hidden flex items-center justify-center flex-col"
            >
              <div
                class="flex duration-[1s] pt-[20px]"
                :class="!show ? 'opacity-[0]' : 'opacity-[1]'"
                id="qrcode"
                ref="qrCode"
                @click="downloadImage($event)"
              >
                <a :href="downloadLink"></a>
              </div>
              <div
                class="flex flex-wrap gap-[50px] mt-[30px] p-[20px] gap-y-[20px]"
              >
                <button
                  @click="open()"
                  class="btn rounded-[12px] w-[120px] bg-blue-700 text-white p-[10px] text-[18px] active:scale-[0.97] flex-auto"
                >
                  <i class="fa-regular fa-circle-check"></i>
                </button>
                <button
                  @click="downloadQRCode()"
                  v-if="show"
                  class="btn rounded-[12px] w-[120px] bg-blue-700 text-white p-[10px] text-[18px] active:scale-[0.97] flex-auto"
                >
                  <i class="fa-solid fa-download"></i>
                </button>
                <button
                  v-if="show"
                  @click="printReceipt()"
                  class="btn rounded-[12px] w-[120px] bg-blue-700 text-white p-[10px] text-[18px] active:scale-[0.97] flex-auto"
                >
                  <i class="fa-solid fa-print"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-[32px] text-center font-bold">Foydalanuvchilar</h1>
      <table
        v-if="users.length"
        class="table-autop-2 mt-[30px] rounded-[20px] sm:w-full *:dark:text-gray-900"
      >
        <thead class="">
          <tr class="*:border-2 *:border-black">
            <th class="text-[20px] font-bold italic py-[10px]">
              Foydalanuvchi
            </th>
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
              {{ item?.date_joined.slice(0, 10) }}
            </td>
          </tr>
        </tbody>
        <DataNotFound v-if="!users.length" />
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../../store";
import DataNotFound from "../../components/DataNotFound/DataNotFound.vue";
export default {
  data() {
    return {
      text: "",
      show: false,
      qrCodeImage: "",
      users: [],
    };
  },
  components: { DataNotFound },
  methods: {
    createQrcode() {
      if (this.text) {
        let element = document.querySelector("#qrcode");
        element.innerHTML = "";
        let qrCode = new QRCode(element, {
          text: this.text,
          width: 150,
          height: 150,
          colorDark: "blue",
        });
        this.qrCodeImage = qrCode._el.firstChild.toDataURL();
        this.text = "";
      }
    },
    open() {
      if (this.text) {
        this.show = true;
        this.createQrcode();
      } else {
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
      }
    },

    printReceipt() {
      this.$nextTick(() => {
        const element = document.querySelector("#qrcode").outerHTML;
        const winPrint = window.open("", "_blank");
        winPrint.document.head.innerHTML += `
                  <style>
                      * {
                          margin: 0;
                          padding: 0;
                          box-sizing: border-box;
                          font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                      }

                      @page {
                        margin: 0;
                        size: auto;
                      }

                      @meida print {
                          .receipt {
                              width: 100%;
                          }
                      }
                      #qrcode {
                        margin-top: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        }

                  </style>
              `;
        winPrint.document.body.innerHTML = element;
        setTimeout(() => {
          winPrint.print();
          winPrint.close();
        }, 100);
      });
    },

    downloadQRCode() {
      var link = document.createElement("a");
      link.href = this.qrCodeImage;
      link.download = "qr_code.png";
      link.click();
    },
    scroll(event) {
      const element = event.target;
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        console.log("hello");
        if (this.current_page < this.pages - 1) {
          this.current_page = this.current_page + 1;
        }
      }
      //   console.log(element.scrollTop );
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        console.log(
          element.scrollTop + element.clientHeight,
          element.scrollHeight,
          "shoh"
        );
      }
    },
    async getAllUsers() {
      await store.dispatch("setLoading", true);
      try {
        const response = await axios.get(
          "https://mycorse.onrender.com/https://trustcheck.pythonanywhere.com/api/get-all-user",
          {
            auth: {
              username: "admin",
              password: "1",
            },
          }
        );

        this.users = response.data.results;
        await store.dispatch("setLoading", false);
      } catch (error) {
        console.error("Error fetching users:", error);
        await store.dispatch("setLoading", false);
      }
    },
  },
  created() {
    this.getAllUsers();
  },
};
</script>

<style lang="scss" scoped>
#qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>