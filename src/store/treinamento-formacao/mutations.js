export function UPDATE_FORMACAO (state, payload) {
	var composicao_cursos_content = {};
	payload.data.niveis_ordem.forEach((data, index) => {
		composicao_cursos_content[data] = [];
	});
    state.data = {...payload.data, composicao_cursos_content:composicao_cursos_content }
    state.metadata = payload.metadata
}

export function UPDATE_FORMACAO_CURSOS_CONTENT ( state, { data, type}) {
    state.data['composicao_cursos_content'][type].push(data.data)
}