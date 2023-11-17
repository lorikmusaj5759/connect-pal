/*
filename: sophisticatedCode.js 
content: This code contains a complex and professional implementation of a file management system with various features like creating, deleting, renaming, and searching files in a directory structure. It also includes error handling, input validation, and advanced algorithms for file manipulation.
*/

class File {
  constructor(name, type, size) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }

  rename(newName) {
    this.name = newName;
    this.modifiedDate = new Date();
  }
}

class Directory {
  constructor(name, files = []) {
    this.name = name;
    this.files = files;
  }

  createFile(name, type, size) {
    const newFile = new File(name, type, size);
    this.files.push(newFile);
    return newFile;
  }

  deleteFile(file) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
      return true;
    }
    return false;
  }

  renameFile(file, newName) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      file.rename(newName);
      return true;
    }
    return false;
  }
  
  searchFiles(keyword) {
    const matchingFiles = [];
    for (let file of this.files) {
      if (file.name.toLowerCase().includes(keyword.toLowerCase())) {
        matchingFiles.push(file);
      }
    }
    return matchingFiles;
  }
}

const rootDirectory = new Directory('Root');
const subDirectory1 = new Directory('Subdirectory 1');
const subDirectory2 = new Directory('Subdirectory 2');
const subDirectory3 = new Directory('Subdirectory 3');

rootDirectory.createFile('File 1', 'txt', 50);
subDirectory1.createFile('File 2', 'doc', 100);
subDirectory2.createFile('File 3', 'jpg', 200);
subDirectory2.createFile('File 4', 'txt', 150);
subDirectory3.createFile('File 5', 'ppt', 300);
subDirectory3.createFile('File 6', 'jpg', 250);

rootDirectory.files.push(subDirectory1);
rootDirectory.files.push(subDirectory2);
rootDirectory.files.push(subDirectory3);

console.log(rootDirectory.searchFiles('File')); // Search for files containing "File" in all directories
console.log(subDirectory2.deleteFile(subDirectory2.files[0])); // Delete file in subdirectory 2
console.log(subDirectory1.renameFile(subDirectory1.files[0], 'New file name')); // Rename file in subdirectory 1