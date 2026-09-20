const IEFD = {
    id: 'IEFD',
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

    <div class="pt-80 px-6 container mx-auto w-fit">
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center">
        Islamic Economics and Finance Department (Sharia PUVA PArticipant)
      </h3>

      <img src="assets/img/IEFD/table.png" >
      
      <div class="flex justify-between items-center">
        <div class="w-96 mt-8">
          <c-button data-previous="integrated-licensing" class="">
            <div class="flex justify-center items-center gap-8  px-8">
                  <img src="assets/img/arrow-left-gold.svg" class="w-14">
                  <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
        </div>
        <div class="w-96 mt-8">
          <c-button data-next="MASMD" class="">
            <div class="flex justify-center items-center gap-4 px-8 pl-2">
                <p class="text-button text-xl"> Monetary and Asset Securities Management Department </p>
                <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
      </div>
    </div>
    
    `
}