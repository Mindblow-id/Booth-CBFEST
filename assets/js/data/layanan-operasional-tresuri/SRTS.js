const SRTS = {
  id: "SRTS",
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

    <div class="pt-80 container mx-14 w-fit">
      <h3 class="text-5xl title w-fit mx-auto uppercase text-center">
        Scope Of Rupiah Treasury Settlement  
      </h3>

      <c-card class=" w-full h-[600px]" content-style="top: 0; left: 50%; transform: translate(-50%, 0); align-items: start; justify-content: start;">
        <div class="mx-12 mt-12">
            <p class="text-gradient text-3xl">
                1. Rupiah Open Market Operation
            </p>
            <ul class="list-[lower-alpha] mx-12 text-2xl" >
                <li class="Arial">
                    Absorption
                        <ul class="list-disc ml-8">
                            <li class="Arial">
                                SBI/SBIS: Sertifikat Bank Indonesia / Sharia Bank Indonesia Certificate
                            </li>
                            <li class="Arial">
                                SDBI: Surat Deposito Bank Indonesia (Bank Indonesia Deposit Certificate)

                            </li>
                            <li class="Arial">
                                SRBI: Sukuk Bank Indonesia (Bank Indonesia Sukuk)

                            </li>
                            <li class="Arial">
                                RR SBN/SBSN: Reverse Repo of SBN/SBSN (Reverse Repo of Government 
                            </li>
                            <li class="Arial">
                                Bonds / Government Sharia Bonds)

                            </li>
                            <li class="Arial">
                                TD: Term Deposits
                            </li>
                            <li class="Arial">
                                Sell SBN Outright: Selling Government Bonds Outright

                            </li>
                            <li class="Arial">
                                SukBI: Sukuk Bank Indonesia (Bank Indonesia Sukuk)
                            </li>
                        </ul>
                </li>
                <li class="Arial">
                    Injection
                        <ul class="list-disc ml-8">
                            <li class="Arial">
                                Repo: Repurchase Agreement
                            </li>
                            <li class="Arial">
                                PASBI: Penempatan Aset Surat Berharga Bank Indonesia (Placement of Indonesia Securities Assets)
                            </li>
                            <li class="Arial">
                                Buy SBN Outright: Buying Government Bonds Outright
                            </li>
                        </ul>
                </li>
            </ul>
        </div>
      </c-card>

      <c-card class="mt-12 w-full h-[350px]" content-style="top: 0; left: 50%; transform: translate(-50%, 0); align-items: start; justify-content: start;">
        <div class="mx-12 mt-12">
            <p class="text-gradient text-3xl">
                2. Standing Facility
            </p>
            <ul class="list-[lower-alpha] mx-12 text-2xl" >
                <li class="Arial">
                    Absorption
                        <ul class="list-disc ml-8">
                            <li class="Arial">
                                DF: Deposit Facility
                            </li>
                            <li class="Arial">
                                FASBIS: Bank Indonesia Deposit Facility
                            </li>
                        </ul>
                </li>
                <li class="Arial">
                    Injection
                        <ul class="list-disc ml-8">
                            <li class="Arial">
                                LF: Lending Facility
                            </li>
                            <li class="Arial">
                                FF: Funding Facility
                            </li>
                        </ul>
                </li>
            </ul>
        </div>
      </c-card>

     <div class="flex justify-between items-center w-full mt-12"> 
          <c-button data-previous="treasury-profile" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <img src="assets/img/arrow-left-gold.svg" class="w-14">
              <p class="text-button text-xl"> Back to Menu </p>
            </div>  
          </c-button>
          <c-button data-next="SFTS" class="w-96">
            <div class="flex justify-center items-center  px-8">
              <p class="text-button text-xl"> Scope of Forex Treasury Settlement </p>
              <img src="assets/img/arrow-right-gold.svg" class="w-14">
            </div>  
          </c-button>
        </div>
    </div>
    `,
};
