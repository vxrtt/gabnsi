# Hangman game
import random

WORDLIST_FILENAME = "words.txt"

def loadWords():
    """
    Renvoie une liste de mots valides. Les mots sont des chaînes de lettres minuscules.
    
    En fonction de la taille de la liste de mots, cette fonction peut
    prendre un certain temps pour se terminer.
    """
    print("Chargement de la liste des mots depuis le fichier...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline()
    # wordlist: list of strings
    wordlist = line.split()
    print("  ", len(wordlist), "mots chargés.")
    return wordlist
def chooseWord(wordlist):
    """
    wordlist (list): liste de mots (strings)

    Renvoie un mot de la liste au hasard.
    """
    return random.choice(wordlist)

# -----------------------------------
wordlist = loadWords()

def isWordGuessed(secretWord, lettersGuessed):
    '''
    secretWord: string, mot que le joueur est en train de deviner
    lettersGuessed: list, quelles lettres ont été devinées jusqu'à présent
    returns: boolean, True si toutes les lettres de secretWord sont dans lettersGuessed;
      Sinon : False
    '''
    c=0
    for i in lettersGuessed:
        if i in secretWord:
            c+=1
    if c==len(secretWord):
        return True
    else:
        return False


def getGuessedWord(secretWord, lettersGuessed):
    '''
    secretWord: string, mot que le joueur est en train de deviner
    lettersGuessed: list, quelles lettres ont été devinées jusqu'à présent
    returns: string, composé de lettres et de caractères de soulignement qui représente
      quelles lettres de secretWord ont été devinées jusqu'à présent.
    '''
    s=[]
    for i in secretWord:
        if i in lettersGuessed:
            s.append(i)
    ans=''
    for i in secretWord:
        if i in s:
            ans+=i
        else:
            ans+='_ '
    return ans



def getAvailableLetters(lettersGuessed):
    '''
    lettersGuessed: list, quelles lettres ont été devinées jusqu'à présent
    returns: string, composé de lettres qui représente quelles lettres n'ont pas
      encore été devinées.
    '''
    import string
    ans=list(string.ascii_lowercase)
    for i in lettersGuessed:
        ans.remove(i)
    return ''.join(ans)

def hangman(secretWord):
    '''
    secretWord: string, est le mot secret à deviner.

    Lance le jeu du Pendu.

    * Au début du jeu, faites savoir à l'utilisateur combien de 
      lettres possède secretWorld.

    * Demandez à l'utilisateur de fournir une réponse (c'est-à-dire une lettre) par manche.

    * L'utilisateur doit recevoir un retour immédiat après chaque proposition 
      sur le fait que sa réponse apparaît dans le mot de l'ordinateur.

    * Après chaque manche, vous devez également afficher à l'utilisateur le mot partiellement
      deviné jusqu'à présent, ainsi que des lettres que
      l'utilisateur n'a pas encore deviné.

    Respecter les autres limitations détaillées dans la description du problème..
    '''
    print("Bienvenue dans le jeu du Pendu !")
    print("Trouver le mot auquel je pense,")
    print("Vous avez 8 chances pour repartir la vie sauve !")
    print("Commençons,")
    print("Je pense a un mot de",len(secretWord),"lettres.")
    
    global lettersGuessed
    mistakeMade=0
    lettersGuessed=[]
    
    while 8 - mistakeMade > 0:
        
        if isWordGuessed(secretWord, lettersGuessed):
            print("-------------")
            print("Bravo, vous avez gagné!")
            break
            
        else:
            print("-------------")
            print("Il vous reste",8-mistakeMade,"chances.")
            print("Lettres que vous pouvez utiliser :",getAvailableLetters(lettersGuessed))
            guess=str(input("Choisiez une lettre: ")).lower()
            
            if guess in lettersGuessed:
                print("Oups! Vous avez déjà choisi cette lettre :",getGuessedWord(secretWord,lettersGuessed))
                
            elif guess in secretWord and guess not in lettersGuessed:
                lettersGuessed.append(guess)
                print("Bien joué, continuez :",getGuessedWord(secretWord,lettersGuessed))
                
            else:
                lettersGuessed.append(guess)
                mistakeMade += 1
                print("Oups! Cette lettre n'est pas dans le mot:",getGuessedWord(secretWord,lettersGuessed))
                
        if 8 - mistakeMade == 0:
            print("-------------")
            print("Malheureusement, vous avez perdu... Le mot était :",secretWord)
            break
        
        else:
            continue


secretWord = chooseWord(wordlist).lower()
hangman(secretWord)
