var loc = window.location
const HOSTURL = `${loc.protocol}//${loc.hostname}:${loc.port}`
var el = x => document.getElementById(x);

function showPicker() {
	el("file-input").click();
	el("analyze-button").innerHTML = "Analyze";
}

function showPicked(input) {
	el("upload-label").innerHTML = input.files[0].name;
	var reader = new FileReader();
	reader.onload = function(e) {
		el("image-picked").src = e.target.result;
		el("image-picked").className = "";
	};
	reader.readAsDataURL(input.files[0]);
	el("analyze").style.display = "block";
	el("result").style.display = "none";
}

function convertToFormData(key, val) {
	const body = new FormData()
	body.append(key, val)
	return body
}

function predict(img) {
	var uploadFiles = el("file-input").files;
	if (uploadFiles.length !== 1) {
		alert("Please select a file to analyze!");
	} else {img = uploadFiles[0]}
	el("analyze-button").innerHTML = "Analyzing...";
	fetch(`${HOSTURL}/predict`, {
		method: 'POST',
		body: convertToFormData('img', img)
	})
		.then(async (response) => {
			try {
				const { predict } = await response.json()
				console.log('prediction: ', predict)
				el("analyze").style.display = 'none';
				el("result").style.display = 'block';
				if (predict === 'benign nevi') {
					pred = 'benign nevus'
					el("result-label").style.color = 'green';
				} else if (predict === 'maligmelanoma') {
					pred = 'malignant melanoma'
					el("result-label").style.color = 'red';
				} else {
					pred = 'unknown'
					el("result-label").style.color = '£333';
					}
				el('result-label').innerHTML = pred
			} catch (e) {
				alert(e.message)
			}
		})
		.catch(err => alert (err))
}

function termsChecked() {
	var vis = 0.5;
	var events = 'none'
	var chbox = el("termscheck"); 
	if(chbox.checked){
			 vis = 1;
			 events = 'auto'
			}
	el("start-btn").style.opacity = vis;
	el("btn-center").style.pointerEvents = events;
}

