const RAS = {
  id: "RAS",
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
        Treasury Operational Services
      </h2>
    </div>

    <div class="pt-72 container mx-14 w-[968px]">
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center">
        Reserve Asset Scoping
      </h3>

      <p class="mt-12 text-center text-3xl text-shadow" style="font-family: Arial, Helvetica, sans-serif;">
          Accommodating the Reserve Management Reform and Global Financial Market Challenges through the Enhancement of Treasury Infrastructure Along with Strengthening the Settlement Mechanism
      </p>
    <div class="w-full flex flex-col items-center -mt-8">
        <img class="w-[824px] h-fit"  src="assets/img/RAS/Graph.png"> 
        <img class="w-[824px] h-fit"  src="assets/img/RAS/Table.png"> 
    </div>
     <div class="flex justify-between items-center w-full mt-4"> 
          <c-button data-previous="treasury-profile" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
          <c-button data-next="TMOI" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <p class="text-button text-xl"> Treasury and Monetary Operation Infrastructure </p>
              <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
    </div>
    `,
};
