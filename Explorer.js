class Folder {
    constructor(name, fileName) {
        this.name = name
        this.fileName = fileName
    }

    getName() {
        createFolder(this.name, this.fileName);
    }

    rename() {
        renameFileFolder(this.name)
    }
}


class File {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    getName() {
        createFile(this.name, this.content)
    }

    getContent() { }

    rename() {
        renameFileFolder(this.name)
    }

    changeContent() { }
}

const explorer = document.getElementById('explorer');
const folderList = [];
const fileList = [];

function createFolder() {
    const folderName = document.createElement('input');
    folderName.type = 'text';
    explorer.appendChild(folderName);
    folderName.addEventListener('change', function () {
        const folder = document.createElement('ul');
        const folderElement = document.createElement('li');
        folderElement.classList.add('folderElement')
        folderElement.id = 'folder';
        folderElement.innerHTML = folderName.value;
        folderName.value = '';
        folderName.style.display = 'none';
        folder.appendChild(folderElement);
        explorer.appendChild(folder);
        const myFolder = new Folder(folderElement.innerHTML)
        folderList.push(myFolder);
        folderElement.addEventListener('click', function () {
            myFolder.fileName = createFile(myFolder);
            console.log(folderList);
        })
        return folderList
    })
}

function createFile() {
    const fileName = document.createElement('input');
    fileName.type = 'text';
    fileName.classList.add('fileName');
    explorer.appendChild(fileName);
    fileName.addEventListener('change', function () {
        const file = document.createElement('ul');
        const fileElement = document.createElement('li');
        fileElement.id = 'file';
        fileElement.innerHTML = fileName.value;
        const myFile = new File(fileElement.innerHTML, {content: 'Your code here'});

        if (!(fileElement.innerHTML.includes('.'))) {
            alert('Invalid file name');
            fileElement.innerHTML = '';
        }
        else if (fileElement.innerHTML.endsWith('.html')) {
            fileElement.innerHTML = `<> ${fileElement.innerHTML}`
        }
        else if (fileElement.innerHTML.endsWith('.css')) {
            fileElement.innerHTML = `# ${fileElement.innerHTML}`
        }
        else if (fileElement.innerHTML.endsWith('.js')) {
            fileElement.innerHTML = `JS ${fileElement.innerHTML}`
        }  

        fileElement.addEventListener('click', function () {
            addTab(fileElement.innerHTML);
        })

        fileList.push(myFile);
        console.log(fileList);
        fileName.value = '';
        fileName.style.display = 'none';
        file.appendChild(fileElement);
        explorer.appendChild(file);
    })
    return fileList
}

function renameFileFolder(name) {
    name.addEventListener('dblclick', function () {
        let editable = document.querySelector('.folderElement');
        console.log(editable);
        editable.onclick = function () {
            editable.setAttribute("contentEditable", true);
            // editable.contentEditable = true;
        }
    })
}

////////// Tabs ////////
const tab = document.querySelector('#tab');

function addTab(fileName) {
    const tabElement = document.createElement('button');
    const closeIcon = document.createElement('img');
    closeIcon.src = 'closeIcon.png';
    // closeIcon.display = 'none';
    tabElement.classList.add('tabLink');
    tabElement.innerHTML = fileName;

    tabElement.addEventListener('click', function(file){
        editor(file.content);
        console.log(file.content)
    })

    tabElement.appendChild(closeIcon);
    tab.appendChild(tabElement);
}
//////////Editor///////////
const editorElem = document.querySelector('#editor');

 function editor(content){
    const editorElement = document.querySelector('.textarea');
    editorElement.innerHTML = content;
    editorElem.appendChild(editorElement);

 }
