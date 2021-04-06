import axios from 'axios'
import hash from 'object-hash'

const API = process.env.API
const API_URL_CARRINHO = `${API}/carrinho/`


//CARRINHO
export async function fetchNewCarrinho (context) {
    let url = `${API_URL_CARRINHO}novo`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))

    if( payloadCached){
        context.commit('CARRINHO', payloadCached)
    } else {
        try{
            let resp = await axios.post( url)
            let data = resp.data 
            
            context.commit('CARRINHO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }catch( error){
            console.log(error)
        }
    }
}

export async function fetchGetCarrinho (context) {
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    let payloadCached = JSON.parse( window.sessionStorage.getItem( hashCode))
    if ( payloadCached ) {
       context.commit('CARRINHO', payloadCached)
    }
}

export async function fetchCarrinho(context, id){
    let url = `${API_URL_CARRINHO}${id}`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')

    try{
        let resp = await axios.get( url)
        if ( resp.data ) {
            let data = resp.data 
            
            context.commit('CARRINHO', data)
            window.sessionStorage.setItem( hashCode, JSON.stringify( data))
        }
    }catch( error){
        console.log(error)
    }
}

export async function fetchAddProduto (context, payload) {
    let url = `${API_URL_CARRINHO}adicionar`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    
    let resp = await axios.post( url, payload)
    let data = resp.data 
            
    context.commit('SET_DATA', data)
    window.sessionStorage.setItem( hashCode, JSON.stringify( data))

    await this.dispatch( 'carrinho/fetchRecheckVoucherCarrinho', payload)

}

export async function fetchAddProdutoOnline (context, payload) {
    let url = `${API_URL_CARRINHO}adicionar-online`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    
    let resp = await axios.post( url, payload)
    let data = resp.data 
            
    context.commit('SET_DATA', data)
    window.sessionStorage.setItem( hashCode, JSON.stringify( data))

    await this.dispatch( 'carrinho/fetchRecheckVoucherCarrinho', payload)

}

export async function fetchRemoveProduto (context, payload) {
    let url = `${API_URL_CARRINHO}remover`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    
    let resp = await axios.post( url, payload)
    let data = resp.data 
            
    context.commit('SET_DATA', data)
    window.sessionStorage.setItem( hashCode, JSON.stringify( data))
    this.dispatch( 'carrinho/fetchRecheckVoucherCarrinho', {carrinho_id: data.data.id})
}

export async function fetchSetVoucherCarrinho(context, payload){
    let url = `${API_URL_CARRINHO}voucher`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    try{
        let resp = await axios.post( url, payload)
        let data = resp.data 
        resp.status === 200 || throw new Error(`data.data.details`)
        context.commit('SET_ERROR', '');
        context.commit('SET_DATA', data)
        window.sessionStorage.setItem( hashCode, JSON.stringify( data))
    } catch( error){
        context.commit('SET_ERROR', error.response.data.details[0]);
    }
}

export async function fetchRecheckVoucherCarrinho(context, payload){
    let url = `${API_URL_CARRINHO}voucher/recheck`
    let hashCode = hash.MD5('CARRINHO_IMPACTA')
    let resp = await axios.post( url, payload)
    let data = resp.data 

    context.commit('SET_DATA', data)
    
    window.sessionStorage.setItem( hashCode, JSON.stringify( data))
    
}

export async function fetchCloseCarrinho (context, idcarrinho){

    let url = `${API_URL_CARRINHO}fechar/${idcarrinho}`
    let resp = await axios.post( url,{_method:'PUT'});

    let hashCode = hash.MD5('CARRINHO_IMPACTA')

    window.sessionStorage.removeItem(hashCode);
}

export async function fetchCarrinhoPessoa (context, payload){
    let url = `${API_URL_CARRINHO}cliente/${payload.idcarrinho}`
    let resp = axios.post( url,{_method:'PUT', pessoa_id: payload.pessoa_id});

}

export async function fetchPagamento(context, payload){

    var formData = new FormData;
    let t = this;

    for(let x in payload){
        formData.append(x, payload[x]);
    }

    // let resp = await axios.get('https://services.impacta.com.br/pagamento/novo-pagamento.php', payload);
    var xml = new XMLHttpRequest();
    xml.open("POST","https://services.impacta.com.br/pagamento/novo-pagamento.php")

    let message = "";

    xml.onreadystatechange = async function() {

        if ( this.readyState == 4 ) {
            let response = JSON.parse(this.response);
            switch(this.status){
                case 400:
                    alert(response.message);
                    break;
                case 200:
                    let resp = await t.dispatch( 'carrinho/fetchCloseCarrinho', payload.idcarrinho);
                    let hashCode = hash.MD5('PAGAMENTO')
            
                    context.commit('pagamento/SET_PAGAMENTO', response, {root:true});

                    window.sessionStorage.setItem( hashCode, JSON.stringify( response));
                    // window.sessionStorage.removeItem(hash.MD5('CARRINHO_IMPACTA'));

                    window.location.href = "pagamento-sucesso"
                    break;
            }
        }
    }

    xml.send(formData);

}
