<script>
module.exports = {
  name: "bottom",
  data() {
    return {
    }
  },
  created() {
  }
}
</script>

<template>
  
	<div class="footer fixed-bottom d-print-none">
    <div class="row">
      <div class="col-1 d-flex align-items-center justify-content-end text-right">
        <img src="img/eu-flag.svg" alt="EU Flag" style="height: 100%; max-height: 20px; width: auto;">
      </div>
      <div class="col-11  d-flex align-items-center text-left">
        <p class="m-0 small">This tool was developed under the EU project <a href="https://digitaf.eu/" target="_blank">DigitAF</a> (Grant Agreement N° 101059794), co-funded by the European Commission, European Research Agency, within the Horizon Europe programme, Cluster 6: “Food, bioeconomy, natural resources, agriculture and environment”, as part of Deliverable 4.5, and is intended to evolve according to needs.</p>
      </div>
    </div>
  </div>
</template>