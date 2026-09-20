const LCIBP = { 
    id: 'LCIBP',
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
        Letter Of Credit (L/C) Issuance Business Process
      </h3>

      <p class="mt-12 text-center text-3xl" style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.65);">
        L/C is a definite promise that cannot be cancelled unilaterally (irrevocable) and is a guarantee by the issuing bank to make payment based on the documents delivered in accordance with agreed terms and conditions.  
      </p>

      <div class="flex flex-col justify-center items-center mt-8">
        <figure
          class="cbs-diagram"
          aria-label="Letter of credit issuance process and terminology notes"
        >
          <img
            class="block w-full h-auto"
            src="assets/img/LCIBP/lcibp.png"
            width="2234"
            height="754"
            alt="L/C issuance flow: Ministry or Institution, Bank Services Division, Applicant System (CBS/SWIFT), Advising Bank, and Beneficiary; with coordination involving the Ministry of Finance and related departments in Bank Indonesia."
          >
          <img
            class="block w-full h-auto mt-8"
            src="assets/img/LCIBP/notes.png"
            width="2072"
            height="272"
            alt="Notes: SKP L/C means Power of Attorney to Charge L/C; SPP L/C means L/C Opening Approval Letter; SP2D means Disbursement Order. Communication symbols indicate the means of communication."
          >
        </figure>
        
        <c-card class="w-full h-[350px] mt-14">
            <div class="flex flex-col p-6">
                <p class="text-button text-center text-3xl font-semibold w-fit mx-auto"> Information </p>
                <div 
                  class="w-full mt-6 mb-4 h-1 rounded"
                  style="
                    background: linear-gradient(90deg, #a97c50 0%, #e7cba0 50%, #a97c50 100%);
                    opacity: 0.7;
                  "
                ></div>
                <ol class="list-decimal pl-8 pr-4 text-xl text-white" style="font-family: Arial, Helvetica, sans-serif;">
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    a. The submission of L/C Application by Ministry/Institution<br>
                    b. The submission of SKP/SPP L/C/SP2D by Ministry of Finance
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    a. The process of inputting L/C transaction done in BI-Core Banking System<br>
                    b. If the transactions are indicated to be subject of international sanctions, Banking Services Division will coordinate it first with relevant department in Bank Indonesia
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    BI issue the L/C and send it to advising bank through SWIFT (MT 700). Simultaneously, BI send notification letter both to Ministry of Finance and the applicant
                  </li>
                  <li style="font-family: Arial, Helvetica, sans-serif;">
                    The advising bank forward the L/C to the beneficiary
                  </li>
                </ol>
            </div>
        </c-card>

        <div class="flex justify-between items-center w-full mt-8"> 
          <c-button data-previous="lk-type-of-service" class="w-88">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
          <c-button data-next="SRS" class="w-88">
            <div class="flex justify-center items-center  px-8">
              <p class="text-button text-xl"> Sub-Registry Services </p>
              <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
      </div>
    </div>
    `
}
