# GIT Coomands

These are some of my git commands

### How to init a git repository
```sh
$ git init
$ git remote add origin 'github url'>
$ git add 'folder to add'>
$ git commit -m "message"
$ git push
```
- The git add command adds a change in the working directory to the staging area
- Commits are the core building block units of a Git project timeline

### How to re-make a git commit
You add the param ```--ammend``` before ```-m``` and you have to add the param ```-f``` when push this is to force the push.
```sh
$ git commit --amend -m "message"
$ git push -f
```

### Check files to commit
Use this command if you want to know what you are going to push
```sh
$ git status
```

### Check previous commits
Use this command if you want to know your previous commits
```sh
$ git log
```

### Create branch
Use this command if you want to create a new branch

```Becareful: Check always when create the new branch you are in develop```
```sh
$ git branch <name of new branch>
```

### Moving for branches
Use this command if you want to switch up to another branch
```sh
$ git checkout "branch"
```

### Delete branch
Use this command if you want to delete a branch
```sh
$ git branch -D "branch"
```

### Your branches
### * is branch where you are
Use this command if you want to know the tree of your branches, ```*``` is the branch where you are right now.
```sh
$ git branch

  develop
  feature/arrays
  feature/bash
  * feature/git
  feature/playground
  feature/space-invaders
  feature/strings
```