function startPine() {
	let code = document.querySelector('.code code')
	pine.core.fetchNoteById(pine.params.nid, (file)=>{
		code.innerHTML = file.data;
		code.className = `h-full language-${file.ext}`;
		
		document.querySelector('#date').innerHTML = new Date(file.metadata.created).toDateString();
		hljs.highlightAll();
		// console.log('Success');
	}, (err)=>{
		// console.log('Error')
	});
}
