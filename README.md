# LegacyMinecraftSkins
Legacy Minecraft Skins fix via effectively mocking the old HTTP service

This should work with all minecraft versions before 1.4 release.

This script was put together in about an hour or so as a temporary solution for someone I work with, so don't expect exceptional code quality.

# Setup

## Server setup

Get started by making sure you have **nodejs (8.0.0+) and npm** installed.
If you don't, then google is your friend.

To start the script, run via `npm run start`. 

Note: this might need to run as super user (via sudo on *nix/macos or run as admin on windows) due to needing to run on port 80.

## Client setup
Edit the hosts file for your OS (/etc/hosts on *nix/macos or C:/windows/system32/drivers/etc/hosts on windows) to include the following line.

Change `<IP ADDRESS>` to either 127.0.0.1 if running locally or the IP address of your remote server.

`<IP ADDRESS>     s3.amazonaws.com`

Note: comment out/remove this line if you regularly interact with s3.amazonaws.com, as this will also redirect traffic other than MC skins.
