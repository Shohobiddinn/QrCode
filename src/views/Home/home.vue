<template>
  <div>
    <div>
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
                @input="open()"
              ></textarea>
            </div>
            <div
              class="w-full border-[3px] border-blue-700 rounded-[12px] min-h-[250px] overflow-hidden flex items-center justify-center flex-col"
            >
              <div
                class="flex duration-[1s] pt-[20px]"
                :class="!show ? 'opacity-[0]' : 'opacity-[1]'"
                id="qrcode"
                ref="qrCanvas"
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
                  :href="downloadLink"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      show: false,
      downloadLink: "",
    };
  },
  methods: {
    createQrcode() {
      if (this.text) {
        let element = document.querySelector("#qrcode");
        element.innerHTML = "";
        new QRCode(element, {
          text: String(this.text),
          width: 150,
          height: 150,
          colorDark: "blue",
        });
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

    downloadImage(event) {
        console.log(event.target.src);
      this.downloadLink = event.target.src;
    },
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