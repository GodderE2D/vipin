---
tagline: ctflearn1
title: CTFLearn Writeup Pt. 1
description: Nearly all the CTFlearn Challenge solutions
banner: /blog/ctflearn1bg.png/
banner_alt: Banner for CTF challenges
date: '2024-02-1'
---

# Author's note

This section of the write-up, along with the others, will contain most of the solutions for the CTFlearn CTF Challenges. Some of the first ones were skipped because I had already completed them and didn't feel like making a solution for them. Most of the solutions in this part is the cryptography/misc/forensics challenges. Hope you enjoy!

## Vignere Cipher

- Used [dcode.fr's Vigenere Decoder](https://www.dcode.fr/vigenere-cipher) like show in the Fig.1 below.

![Image showing how to decode the cipher with dcode.fr](/blog/ctflearn1pics/vignere1.png 'Fig.1')

Flag: ```flag{CiphersAreAwesome}```

## Reverse Polarity

- I used cyberchef and decoded the text from binary. Cyberchef recipe [here](https://gchq.github.io/CyberChef/#recipe=From_Binary('Space',8)&input=MDEwMDAwMTEwMTAxMDEwMDAxMDAwMTEwMDExMTEwMTEwMTAwMDAxMDAxMTAxMDAxMDExMTAxMDAwMTAxMTExMTAxMDAwMTEwMDExMDExMDAwMTEwMTAwMTAxMTEwMDAwMDExMTAwMDAwMTEwMTAwMTAxMTAxMTEwMDExMTExMDE)

Flag: ```CTF{Bit_Flippin}```

## Wikipedia

- Interesting challenge, on wikipedia you can search for a user through their IP address and see their contributions and you can see they contributed to an article called "flag"

![Image showing where the flag is on the article](/blog/ctflearn1pics/wikipedia1.png 'Fig.2')

- And show above is the flag

Flag: ```cNi76bV2IVERlh97hP```

## Hextroadinary

- Using a XOR calculator like [xor.pw](https://xor.pw/) we can put both values in to get the flag.

![Image showing me using xor.pw to get the flag](/blog/ctflearn1pics/xorchall1.png 'Fig.3')

- Make sure to add an ```0x``` in the front or the flag will be incorrect.

Flag: ```Oxc0ded```

## Accumulator

- **Foreword:** This challenge was rated easy and only 10 point, yet being a buffer overflow topic which can seem difficult to beginner's. However this is a fairly easy challenge if you know what you are doing.

- The challenge is a simple buffer overflow challenge. Below is how I solved it.

```bash:terminal
❯ nc rivit.dev 10009
acc = 0
Enter a number: 1111
acc = 1111
Enter a number: 11111111111
You can't enter the negative number!
acc = 1111
Enter a number: 111111111
acc = 111112222
Enter a number: 1111111111
acc = 1222223333
Enter a number: 11111111111111
acc = 1252939692
Enter a number: 1111111111111111
You can't enter the negative number!
acc = 1252939692
Enter a number: 11111111111
You can't enter the negative number!
acc = 1252939692
Enter a number: 11111111111111
acc = 1283656051
Enter a number: 11111111111111111
acc = 1935244090
Enter a number: 11111111111111111111
You can't enter the negative number!
acc = 1935244090
Enter a number: 11111111111111111
You win! acc = -1708135167
CTFlearn{n3x7_7yp3_0f_0v3rf0w}
❯
```

Flag: ```CTFlearn{n3x7_7yp3_0f_0v3rf0w}```

## Time Traveller

- To find the email we can use a tool called "The Wayback Machine" and look for a snapshot on December 31 1996. If you are having trouble getting to the page click [here](https://web.archive.org/web/19961231235847/http://www.nasa.gov/) for the link.

Flag: ```CTFlearn{today@nasa.gov}```

## WOW.... So Meta

- Using [Aperisolve's](https://www.aperisolve.com/) EXIF tool we can look at the metadata of the image *fig.4*

![Image showing where the flag is in the exif section](/blog/ctflearn1pics/exifchall1.png 'Fig.4')

- As shown above in *figure 4.* the flag is found under XMP Microsoft

Flag: ```flag{EEe_x_I_FFf}```

## BruXOR

- The best tool for XOR bruteforce (other than your own py script) is the Cyberchef's XOR Bruteforce. Cyberchef Recipe link [here](https://gchq.github.io/CyberChef/#recipe=XOR_Brute_Force(1,100,0,'Standard',false,true,false,'flag')&input=cXt2cGxuJ2JIX3Zhckh1ZWJjcnF4ZXRySE9YRWo)

Flag: ```flag{y0u_Have_bruteforce_XOR}```

## Modern Gaius Julius Caesar

- All the cipher identifiers haven't been able to identify it, but using dcode.fr's cipher identifer I noticed the word "keyboard" which was also in the challenge description. Trying keyboard shift cipher gives us the flag.

![Image showing the keyboard shift cipher in use](/blog/ctflearn1pics/keyshift1.png 'Fig.5')

- Remember that even if you get CTFlearn{Cyb3rCae54r} remember to add an underscore or the flag will be incorrect.


Flag: ```CTFlearn{Cyb3r_Cae54r}```

## Snowboard

- A simple image forensics challenge where the flag can be found in the strings after being decoded from base64. 

![Image showing where the flag is in the strings section](/blog/ctflearn1pics/snowboard1.png 'Fig.6')

- Beware of the fake flag, it didn't stump me but it did for other people.

Flag: ```CTFlearn{SkiBanff}```

## PikesPeak

- This is another strings challenge, but we are faced with an issue as seen in Fig. 7.

![Image showing the flags in the strings section](/blog/ctflearn1pics/peaks1chall.png 'Fig.7')

- With all these flags it can seem difficult to find which is the correct one, but the way to figure out the right one is by making sure it follows the CTFlearn flag format. To find the correct formatting we can look at the flag box's example flag.

Flag: ```CTFlearn{Gandalf}```

## My Blog

- I enjoyed this challenge very much, if you are having trouble try looking at the bold works **application** & __Memory__. 

- To solve this I instantly went to the application tab in inspect element where nothing seemed to appear on the main landing page in local storage, however when I went to the blog page I found the flag.

![Image showing the flags the application section in inspect element](/blog/ctflearn1pics/myblogchall1.png 'Fig.8')

- Make sure to replace flag with CTFlearn as it says in the description.

Flag: ```CTFlearn{n7f_l0c4l_570r463_15n7_53cur3_570r463}```

## My Friend John

- Before you start this challenge *john* is a foe not a friend, just use *fcrackzip*. 

- To start download the zip and install *fcrackzip*. 

# UNFINISHED 