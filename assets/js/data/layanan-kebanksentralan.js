const LK1Data = {
    id: 'lk-profile',
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
        Central Banking Services
      </h2>
    </div>

    <div class="cbs-profile pt-72 container mx-auto ">
      <h1 class="text-[3.2em] title text-center uppercase leading-16">
        Banking Services, Licensing, and Tresury Operations Department
      </h1>

      <c-card class="w-full h-[150px] ">

        <h1 class="uppercase text-button font-bold text-3xl text-center">
          Organization of Banking Services, Licensing, and Tresury Operations Department
        </h1>
      </c-card>
      <div class="flex items-center justify-center mt-20"> 
        <img src="assets/img/bank-segi-lima.png" class="block w-[500px] h-auto z-10" width="1240" height="1200" alt="Bank Indonesia central banking services." >
      </div>
      <p class="text-center text-4xl font-medium text-shadow mt-20" style="font-family: Arial, Helvetica, sans-serif;">
        Central Banking Services are service provided by Bank Indonesia to its customers to support the implementation of Bank Indonesia’s duties related to monetary, macroprudential, and payment system which includes current account services and the settlement of customer’s financial transaction
      </p>
      <div class="flex justify-center items-center mt-20">
        <c-button class="flex justify-center items-center"  data-next="lk-type-of-service">
          <div class="flex justify-center items-center"> 
            <p class="text-button text-5xl w-96 leading-16 ">
              More About Our Services
            </p>
            <img src="assets/img/arrow-right-gold.svg" class="w-40" >
          </div>
        </c-button>
      </div>
    </div>
    `
}

const LK2Data = {
    id: 'lk-type-of-service',
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
        Central Banking Services
      </h2>
    </div>

    <div class="pt-80 container mx-14 w-fit">
      <h3 class="text-5xl title w-fit mx-auto uppercase">
        Central Banking Services
      </h3>

      <c-card class="w-full h-40">
        <p class="uppercase text-button text-3xl text-center p-4 font-bold"> 
          Organization of Banking Services, Licensing, and Treasury Operations Department
        </p>
      </c-card>

      <p class="mt-12 text-center text-3xl text-shadow" style="font-family: Arial, Helvetica, sans-serif;">
        Central Banking Services are service provided by Bank Indonesia to its customers to support the implementation of Bank Indonesia’s duties related to monetary, macroprudential, and payment system which includes current account services and the settlement of customer’s financial transaction
      </p>

      <div class="flex flex-col justify-center items-center mt-12">
        <img class=" w-[380px]" src="assets/img/CBS/cbankservice.png"  >
        
        <span class="w-1 h-20 bg-white inline-block mx-auto -mt-6"> </span>
        
        <img class="-ml-74 -mt-3 w-[534px] z-1" src="assets/img/CBS/icon1.png" data-next="CAS" >
        
        <span class="w-1 h-20 bg-white inline-block mx-auto -mt-[10px]"> </span>
        
        <img class="-mr-74 -mt-3 w-[534px] z-1" src="assets/img/CBS/icon2.png"  data-next="LCTS">
        
        <span class="w-1 h-20 bg-white inline-block mx-auto -mt-[10px]"> </span>
        
        <img class="-ml-74 -mt-3 w-[534px] z-1" src="assets/img/CBS/icon3.png"  data-next="SRS">
      </div>
    </div>
    `
}
