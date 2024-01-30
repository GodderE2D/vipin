---
tagline: csd-ctf
title: Webhunt - A Creator's Insight
description: How I made & would solve Webhunt
banner: /public/blog/ctf_bg.jpeg/
banner_alt: Banner for CTF challenges
date: '2024-01-30'
---

# 📝 Foreword

This is a more in-depth write-up & creator insight on how to solve the challenge Webhunt. Webhunt was one of the Daily CTF challenges at [Cyberstudent](https://discord.gg/cyberstudents) and my favorite one I made so far. Webhunt was a challenge where 3 parts of the flag were hidden around the website.

# 🔍 Step 1 - Site Analysis

Upon opening the [challenge site](https://437095c8-c22d-4b63-bf98-9b34cbcdc2dd-00-1r8uurngzj33.picard.replit.dev/), we are greeted with a *"HTML5 APP LANDING PAGE,"* which means that there is a chance that the creator didn't make the site himself, and as the creator, I didn't. But in the analysis stage, we want to look for anything that looks off. After a bunch of user feedback, I realized the 1st part of the flag was the hardest to get 🤦🏾‍♂️. But here is how I would find the first part flag. Firstly, use your eyes. Your eyes are going to save you for challenges like this and save you a lot of time. But all you need to do is look at the site. I know some people went to the lengths of finding the template and looking for differences in code or images. And the first part of the flag is ```csd{ping_me_in_gene```

![Use your eyes, they exist for a reason](/public/blog/csd-ctfwriteuppics/usethemeyes.png/ 'GUYE - Guys use your eyes.')

# 🕵️‍♂️ Step 2 - Hunting (hence the name Webhunt)

We still have 2 parts of the flag left, let's go, people! Now for the next one, the finding the template idea isn't too bad, but really you should look at the page source and look around, and if you look in *customscript.js*, it is right there.

# 💻 Step 3 - RE (really easy so dw)

Now continuing on how you should always look at the page source, you are gonna find a suspicious link with the URL tinyurl.com/Ilooksuspiciousclickme. When I created that link, I don't even know why I named it that. If I named it something more modest, it would have been harder to find the flag. And when you click on the link, you get this Python script. Now in my repo, I do talk about this concisely if you need a faster answer, but really, even if you cannot code or read it, you still can read it. What I mean by this is if you look at the code, there were 2 ways to get the flag as when I made this I didn't have the skills or intentions to make a difficult RE challenge, but to get the last part of the flag all you needed to do was either take the ASCII values in the top of the script and decode it, or find the number through the equation at the bottom. For the equation, most people didn't solve it, they used ChatGPT which gave them the numbers 69024. (haha funny so intentional)

![Equation image](/public/blog/csd-ctfwriteuppics/mathequationthing.png/ 'Solve the equation lol')

Once you enter the number, you get this base64 string which gives you the flag after decoding it over and over again. See wasn't that easy.

# 🎉 Conclusion

To some, it was stupidly easy; to others, it was so hard they felt the need to send me a modmail ticket every second. But I hope you learned something from this post or challenge. I spent a lot of time creating these challenges for you all, and I hope you enjoyed them :D.
