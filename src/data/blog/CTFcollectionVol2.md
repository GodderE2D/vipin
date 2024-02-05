---
tagline: CTFcollectionVol2
title: CTF collection Vol.2 Writeup
description: My Writeup for this TryHackMe Room
banner: /blog/tryhackmebanner.png/
banner_alt: Banner for TryHackMe challenges
date: '2024-02-5'
---

# 🚀 Opening Remarks

This is how I solved the [CTF collection Vol.2](https://tryhackme.com/room/ctfcollectionvol2), *WARNING* this does have the solutions to every easter egg. Please don't just copy and paste flags at least try to learn from them. Also this was written as I was solving them so you will get my thoughts at the time for a much more realistic thought process. Hope you enjoy :D

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

- Now we know that port 80 & 22 are open so lets open it on a browser.

## 🌐 Accessing the website

- Upon accessing the website we are met with a overwhelming mess

![Image showing the website upon arrival](/blog/ctfcollectionvol2pics/website1.png 'Fig.1')

- Lets perform a directory search!

## 🔍 Directory Search

- I will be using gobuster for this as I have tried countless tools but this one works the best for me.

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

- Now that we have all this information lets start the first easter egg!

## 🥚 Easter Egg 1

- Well to start lets check out a couple of the directories we found in *Gobuster*, but to speed things up the hint tells us to check out the robots so going to */robots* shows what seems to be a base64 string. If we put the base64 string over and over in Cyberchef with [this](https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)&input=VmxOQ2NFbEZTV2RUUTBKS1NVVlpaMWRUUW01SlIxVm5ZVk5DUTBsR1VXZFRVMEpGU1VWcloxcDVRbGRKUjJ0blVXbENOa2xGYTJkU2FVSnVTVWRqWjFSVFFqVkpSVWxuVkhsQ1NrbEZZMmRrZVVKdVNVWmpaMVY1UWtKSlNHOW5VMU5DUmtsSE9HZGFlVUpwU1VWTloxRnBRbkpKUld0blVsTkNXa2xIWTJkVWVVSlVTVVZKWjJORFFrcEpSVmxuWVhsQ2JrbEdZMmRSZVVKRFNVVTRaMU5UUWtoSlNHTm5VRkVsTTBRbE0wUT0) recipe it gives us this directory called *DesKel_secret_base* which upon arrival gives us this

![Image showing DesKel_secret_base ](/blog/ctfcollectionvol2pics/DesKelsecretbase.png 'Fig.2')

- How amusing 😑, but lets check out the hex string in robots and when [decoded](https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')&input=NDUgNjEgNzMgNzQgNjUgNzIgMjAgMzEgM2EgMjAgNTQgNDggNGQgN...) it gives us the flag

Flag:```THM{4u70b07_r0ll_0u7}```

## 🐣 Easter Egg 2

- When looking at the hint it says something about the base64 string that we decoded which means that that wasn't joke after all!

- Checking out inspect element has a suprise for us

![Image showing the flag in inspect element](/blog/ctfcollectionvol2pics/easteregg2.png 'Fig.3')

Flag: ```THM{f4ll3n_b453}```

## 🍳 Easter Egg 3

- Looking at the hint once more tell us to use a directory buster with *common.txt* and thank god we did that in the beginning. Lets take a look at some of the directories

- Wait what the heck!? I just found the flag for Easter 19 in */small*, guess that another step done 🤷🏾‍♂️.

- And I did it again I may have found the flag for Easter 13 in */ready* 🤦🏾‍♂️.

![Image showing me accidentally getting the flag](/blog/ctfcollectionvol2pics/easteregg13.png 'Fig.4')

- Ironically I found the flags for 19 & 13, but not 3 🗿.

- Trying common.txt gives us the same results for the most part but when looking at */login* source the flag is right there 🤦🏾‍♂️

![Image showing me finding the flag in the source](/blog/ctfcollectionvol2pics/easteregg3.png 'Fig.5')

- Guess I will continue tomorrow, because it is a school night 😴.

Flag: ```THM{y0u_c4n'7_533_m3}```

## 🐥 Easter Egg 4

- Its the morning, so lets continue finishing up the room.

- The hint says "time-based sqli" so I will be using SQLmap to solve it

### Unfinished blog post (WIP)
