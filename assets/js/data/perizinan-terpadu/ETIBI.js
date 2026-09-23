const ETIBI = {
  id: 'ETIBI',
  data: `
    
    
    <div class="flex justify-between mx-auto w-full px-14 items-center absolute top-40"> 
      <c-button
        class="text-lg  xl:top-56 left-14 xl:left-20 w-60"
        data-previous="home"
      >
        <p class="text-button text-xl flex justify-center items-center gap-2">
          <img src="assets/img/arrow-left-gold.svg" class="w-8" >
          Back to Home
        </p>
      </c-button>
      <h2
        class="xl:top-56 right-12 xl:right-18 text-4xl xl:text-5xl text-white"
      >
        Integrated Licennsing
      </h2>
    </div>

    <div class="pt-80  container mx-auto w-fit">
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center">
        Enhanced Transparency in Bank indonesia's Integrated Licensing Service Level Aggrement
      </h3>

      <div class="flex flex-col justify-center gap-8  my-auto items-center mt-80">
        <div class="relative w-full max-w-4xl mx-auto mt-60">
          <!-- Central Earth Button -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button class="w-80 h-auto rounded-full transition-all duration-300" onclick="window.open('https://ease.bi.go.id/', '_blank')">
              <img src="assets/img/ETIBI/earth.png" alt="Earth" class="w-full h-full object-contain p-4">
            </button>
          </div>

          <!-- Departmental Buttons arranged in a circle -->
          
          <div class="absolute left-18 bottom-80">
            <button class="w-90" data-next="BSLAT1">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover ">
              <span class="pb-4 pr-20 pl-12 absolute inset-0 flex items-center justify-center text-white text-left text-md">
                
              Banking Services, Licensing, and Treasury Operations Department
              </span>
            </button>
          </div>
          <div class="absolute right-18 bottom-80">
            <!-- Top Row Right -->
            <button class="w-90" data-next="IEFD">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover -scale-x-100">
              <span class="pb-4 pl-20 pr-12 absolute inset-0 flex items-center justify-center text-white text-right text-md px-2">
                Islamic Economics and Finance Department
              </span>
            </button>
          </div>

          <div class="absolute -left-5 bottom-35">
            <button class="w-90" data-next="MASMD">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover ">
              <span class="pb-4 pr-20 pl-12 absolute inset-0 flex items-center justify-center text-white text-left text-md">
              Monetary and Asset Securities Management Department
              </span>
            </button>
          </div>
          <div class="absolute -right-5 bottom-35">
            <!-- Top Row Right -->
            <button class="w-90" data-next="FMDD">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover -scale-x-100">
              <span class="pb-4 pl-20 pr-12 absolute inset-0 flex items-center justify-center text-white text-right text-md px-2">
              Financial Market Development Department
              </span>
            </button>
          </div>
          
          <div class="absolute -left-18 -bottom-15">
            <button class="w-90" data-next="MMAMSD">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover ">
              <span class="pb-4 pr-20 pl-12 absolute inset-0 flex items-center justify-center text-white text-left text-md">
              Macroprudential, Monetary and Market Surveillance Department
              </span>
            </button>
          </div>
          <div class="absolute -right-18 -bottom-15">
            <!-- Top Row Right -->
            <button class="w-90" data-next="CMD1">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover -scale-x-100">
              <span class="pb-4 pl-20 pr-12 absolute inset-0 flex items-center justify-center text-white text-right text-md px-2">
                Currency Management Department
              </span>
            </button>
          </div>


          <div class="absolute -left-5 -bottom-65">
            <button class="w-90" data-next="PSPD">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover ">
              <span class="pb-4 pr-20 pl-12 absolute inset-0 flex items-center justify-center text-white text-left text-md">
                Payment System Policy Department
              </span>
            </button>
          </div>
          <div class="absolute -right-5 -bottom-65">
            <!-- Top Row Right -->
            <button class="w-90" data-next="PSMD1">
              <img src="assets/img/button-bg-blue.png" alt="" class="w-full h-full object-cover -scale-x-100">
              <span class="pb-4 pl-20 pr-12 absolute inset-0 flex items-center justify-center text-white text-right text-md px-2">
                Payment System Management Department
              </span>
            </button>
          </div>

          <div class="absolute left-66 -bottom-115">
            <!-- Top Row Right -->
            <button class="w-90" data-next="RMCD">
              <img src="assets/img/btn-bg-center.png" alt="" class="w-full h-full object-cover -scale-x-100">
              <span class="px-12 pb-4 absolute inset-0 flex items-center justify-center text-white text-center text-md">
                Report Management and Compliance Department
              </span>
            </button>
          </div>

        </div>
      </div>
    `
}
