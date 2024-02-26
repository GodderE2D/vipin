---
tagline: photonlockdown
title: HTB Photon Lockdown
description: A Hardware challenge by HackTheBox
banner: /blog/photonlockdown.png/
banner_alt: A banner showing
date: '2024-02-26'
---
# Challenge Overview

Short & Sweet writeup, a "very easy" challenge by HTB. I guess thats all you need to know 🤷🏾‍♂️.

## Extracting it

- A simple google search on how to extract rootfs files shows me a tool call *squashfs*.

```bash:Terminal
❯ sudo unsquashfs rootfs

Parallel unsquashfs: Using 8 processors
865 inodes (620 blocks) to write

[=============================================================|] 1485/1485 100%

created 440 files
created 45 directories
created 187 symlinks
created 238 devices
created 0 fifos
created 0 sockets
created 0 hardlinks
╭─    ~/Downloads/ONT                                                   ✔
╰─
```

# Finding the Flag

- We will be using the *find* along with the grep command to get the flag.

```bash:Terminal
❯ find /Users/vipin/Downloads/ONT/squashfs-root -type f -exec grep -Hn "HTB" {} \;

Binary file /Users/vipin/Downloads/ONT/squashfs-root/bin/tc matches
Binary file /Users/vipin/Downloads/ONT/squashfs-root/bin/ip matches
/Users/vipin/Downloads/ONT/squashfs-root/etc/config_default.xml:244:<Value Name="SUSER_PASSWORD" Value="HTB{REDACTED}"/>
```
# [Another challenge solved!](https://www.hackthebox.com/achievement/challenge/1573144/548)

![Image showing the machine has been pwned(/blog/photonlockdownpics/pwnedphoton.png 'Fig.1')