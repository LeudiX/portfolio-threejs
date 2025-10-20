# Git CLI BIBLE

 Recomendaciones:

    - Intentar trabajar con el entorno actualizado
    - Intentar mezclar en tu local antes de subir

    ```bash
    ssh -T git@code.pyxelsolution.com  # Pin inicial con SSH al repositorio remoto 
    git remote add origin 'https://github.com/<repo_name>.git>'
    git remote set-url origin https://github.com/<repo_name>.git
    git remote set-url origin git@code.github.com:<repo_name>.git
                              https://<repo_name>.git
    git remote `or` git remote -v # Muestra la informacion del repositorio remoto
    git remote get-url origin # Muestra la URL del repositorio remoto

    git clone -b <branch_name> --single-branch <repository_url>
    git pull origin <branch_name>
    git checkout -b develop origin/develop # crea develop a partir de origin/develop

    git status # Notifies in real time about the changes in the current repository
    git log -n # Show the commits history (limited to the last n number of commits)
    git branch # Muestra todas las ramas creadas en el entorno local
    git branch -a # Muestra todas las ramas locales y remotas del repositorio
    
    git add  # Add the modified or untracked files from the working directory to the staging area
    git restore `[file-location]` # Discard the changes in the working repository
    git commit -m ''  # Add the changes from the stagin area to the git repository
    git fetch # Muestra los cambios del repositorio remoto sin actualizar
    git pull # Actualiza los cambios del remote en el repositorio local
    git push -u origin master # Hacer la 1ra vez parq informarle al remoto de tracear la rama especificad en el futuro
    git push origin user_guide # Sube los cambios realizados en la rama especificada hacia la remota
    git push origin master --force # Forzar solo en casos especiales
    git merge user_guide # Mezcla los cambios de user_guide en la rama en la que estes ubicado
    git push origin develop # Solicitar el merge en la rama remota correspondiente
    git checkout -b develop origin/develop # crea develop a partir de origin/develop
    git checkout develop # Move to the branch develop
    git branch -D develop  # Elimina la rama develop en el local
    git push origin -d [branch_name] # Elimina la rama en el repositorio remoto
    git branch -rm -r develop  # Elimina las carpetas y archivos especificados 

    git rm --cached <file_name> # Ex: rm --cached .gitignore
    git commit -m "Remove .gitignore from repo"
    ```
