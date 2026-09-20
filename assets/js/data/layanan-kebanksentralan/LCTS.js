const LCTS = {
    id: 'LCTS',
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

    <div class="cbs-page">
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center">
        Letter Of Credit (L/C) Transaction Services
      </h3>

      <p class="mt-12 text-center text-3xl text-shadow" style="font-family: Arial, Helvetica, sans-serif;">
        L/C is a definite promise that cannot be cancelled unilaterally (irrevocable) and is a guarantee by the issuing bank to make payment based on the documents delivered in accordance with agreed terms and conditions.  
      </p>

      <div class="flex flex-col justify-center items-center mt-12">
        <figure class="cbs-diagram" aria-label="Letter of credit transaction services eligibility and service levels">
          <img src="assets/img/LCTS/lcts.png" width="2072" height="1225" alt="Parties eligible to request L/C services: central government agencies, state-owned enterprises, and other approved parties.">
          <img src="assets/img/LCTS/hand.png" width="2072" height="1041" alt="Service levels: five working days for requesting L/C services and two working days for L/C issuance after correct documents are submitted.">
        </figure>
        

        <div class="flex justify-between items-center w-full mt-8"> 
          <c-button data-previous="lk-type-of-service" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
          <c-button data-next="LCIBP" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <p class="text-button text-xl"> Letter of Credit Issuance Business Process </p>
              <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
      </div>
    </div>
    
    `
}
