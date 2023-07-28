# Debug a R3F Application 

## Strict Mode 
we haven't used it yet for the sake of simplification , but it's a must use

Strict Mode will warn you about potential problems in the app
1. unused import
2. infinite render loop 
3. forgotten useEffect dependencies 
4. deprecated practicies

After importting strictMode and wrapping the application with it it will show potential errors in the terminal and in the console

StrictMOde will be ignored once the application is built