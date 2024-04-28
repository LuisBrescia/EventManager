import"./style-C1Vxo-0u.js";import"./bootstrap.esm-DHJneFca.js";class u{constructor(o,i,l,t,p,c){this.id=o,this.tipo=i,this.titulo=l,this.valor=t,this.categoria=p,this.status=c}}var s=JSON.parse(localStorage.getItem("ListaInsumos"))||[],n=JSON.parse(localStorage.getItem("ListaServicos"))||[],e=JSON.parse(localStorage.getItem("Chamados"))||[];if(e.length==0){for(let a=0;a<12;a++)e.push(new u(a,a<6?"Insumo":"Servico","Vazio",0,"1",!1));console.log(typeof e[0].categoria),localStorage.setItem("Chamados",JSON.stringify(e))}var h=6;$(document).ready(function(){m()});function m(){let a;for(let t=0;t<h;t++)s[t]!=null&&(a=f(s[t]),d(a),r(a),$("#items-chamado-I").append(a),$(a).find("#valorChamado").val(e[t].valor),e[t].titulo=s[t].titulo,e[t].status==!0&&($(a).find("#realizaChamado").text(" Fechar chamado"),$(a).find("#realizaChamado").addClass("bi-wifi-off aberto").removeClass("bi-wifi"))),n[t]!=null&&(a=g(n[t]),d(a),r(a),$("#items-chamado-S").append(a),$(a).find("#valorChamado").val(e[t+6].valor),e[t+6].titulo=n[t].titulo,e[t+6].status==!0&&($(a).find("#realizaChamado").text(" Fechar chamado"),$(a).find("#realizaChamado").addClass("bi-wifi-off aberto").removeClass("bi-wifi")));let o=$("#items-chamado-I").children().length-1,i;o==0?i=3:o>3?i=6-o:i=3-o;let l="";for(let t=0;t<i;t++)l+='<div class="caixa-tracejada rounded-3"></div>';$("#items-chamado-I").append(l),o=$("#items-chamado-S").children().length-1,o==0?i=3:o>3?i=6-o:i=3-o,l="";for(let t=0;t<i;t++)l+='<div class="caixa-tracejada rounded-3"></div>';$("#items-chamado-S").append(l)}function r(a){a!=null&&a.find("#realizaChamado").click(function(){$(this).text($(this).text()==" Fechar chamado"?" Abrir chamado ":" Fechar chamado"),$(this).toggleClass("bi-wifi bi-wifi-off aberto"),console.log($(this).parent().parent().attr("id")+" Mudou seus status");let o=$(this).parent().parent().attr("id").split("-")[1];e[o].status=!e[o].status,localStorage.setItem("Chamados",JSON.stringify(e))})}function d(a){a!=null&&(a.find("#valorChamado").change(function(){console.log($(this).parent().parent().parent().attr("id")+" valor: "+$(this).val());let o=$(this).parent().parent().parent().attr("id").split("-")[1];console.log(typeof e[o].valor),e[o].valor=$(this).val(),localStorage.setItem("Chamados",JSON.stringify(e))}),a.find('[name="categoria"]').change(function(){console.log(typeof e[0].categoria),console.log($(this).parent().parent().parent().attr("id")+" categoria: "+$(this).val());let o=$(this).parent().parent().parent().attr("id").split("-")[1];console.log(typeof e[o].categoria),e[o].categoria=$(this).val(),localStorage.setItem("Chamados",JSON.stringify(e))}))}function f(a){let o=JSON.parse(localStorage.getItem("dicionario-"+a.titulo));if(o==null)return;let i="";if(Object.keys(o).forEach(l=>{o[l]!=null&&o[l]>0&&(i+=`<li class="d-flex list-group-item justify-content-between"><span>${l}</span><span class="font-monospace">${o[l]}</span></li>`)}),i!="")return $(`
    <div id="chamado-${a._id}" class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${a.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${i}
          </ul>
      </div>
      <div class="d-flex gap-3 mb-3 justify-content-end">
        <span class="input-group shadow-sm">
            <span class="input-group-text btn-chamado" style="filter: none !important; font-size: 12px;">R$</span>
            <input id="valorChamado" type="number" class="form-control shadow-none" placeholder="Valor do chamado" />  
        </span>

        <select class="form-select shadow-sm" aria-label="Default select example">
            <option value="0">Categoria</option>
            <option value="1">Alimento</option>
            <option value="2">Bebidas</option>
            <option value="3">Ingressos</option>
            <option value="4">Peças</option>
            <option value="5">Ferramentas</option>
            <option value="6">Roupas</option>
            <option value="7">+18</option>
            <option value="8">Outros</option>
        </select>       
      </div>

      <div class="d-flex gap-3 justify-content-end">
        <button id="realizaChamado" class="btn btn-chamado border border-white rounded-5 bi-wifi shadow-sm text-nowrap"> Abrir Chamado </button>
      </div>
    </div>
  `)}function g(a){if(a.linhas==null)return;let o="";for(let i=0;i<a.linhas.length;i++)o+=`<li class="d-flex list-group-item justify-content-between"><span class="text-wrap">${a.linhas[i]}</span></li>`;return(o==""||a.linhas[0].trim()=="")&&(o='<li class="d-flex list-group-item justify-content-between"><span>Adicione uma descrição para esse serviço na tela de listas.</span></li>'),$(`
    <div id="chamado-${a._id+6}" class="bloco-chamado text-white p-3 rounded Papel shadow-sm d-flex flex-column">
      <div class="bloco-chamado-header fs-3 fw-bold d-flex justify-content-between">
          <span class="Topography shadow px-3 bg-1 py-2 text-nowrap rounded-3 w-100 text-center mb-3">${a.titulo}</span>
      </div>
      <div class="bloco-chamado-body m-0 p-0 flex-grow-1">
          <ul class="list-group list-unstyled w-100 bg-1 shadow rounded-3 bg-light text-dark mb-3">
              ${o}
          </ul>
      </div>
      <div class="d-flex gap-3 mb-3 justify-content-end">
        <span class="input-group shadow-sm">
            <span class="input-group-text btn-chamado" style="filter: none !important; font-size: 12px;">R$</span>
            <input id="valorChamado" type="number" class="form-control shadow-none" placeholder="Valor do chamado">  
        </span>

        <select name="categoria" class="form-select shadow-sm" aria-label="Default select example">
            <option value="0">Categoria</option>
            <option value="1">Fotógrado</option>
            <option value="2">Designer</option>
            <option value="3">Garçom</option>
            <option value="4">Goleiro</option>
            <option value="4">Motorista</option>
            <option value="4">Faxineiro</option>
            <option value="4">Acompanhante</option>
            <option value="4">Segurança</option>
            <option value="5">+18</option>
            <option value="6">Outros</option>
        </select>
        
      </div>
      <div class="d-flex gap-3 justify-content-end">
        <button id="realizaChamado" class="btn btn-chamado border border-white rounded-5 bi-wifi shadow-sm text-nowrap"> Abrir Chamado </button>
      </div>
    </div>
  `)}
