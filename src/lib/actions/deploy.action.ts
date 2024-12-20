"use server"

import { Client } from "ssh2";

export async function redeploy(formdata: FormData) {
    const conn = new Client();

    // SSH configuration
    const sshConfig = {
        host: process.env.SSH_HOST,
        port: 22,
        username: "root",
        password: "This1$VPSPassword",
    };

    // Commands to execute
    const commands = `
        cd /var/www/himalayancraft &&
        export NVM_DIR="$HOME/.nvm" &&
        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" &&
        nvm use default &&
        nvm run build &&
        pm2 restart hc
    `;

    const executeCommands = (conn: Client, commands: string) => {
        return new Promise<string>((resolve, reject) => {
            let output = "";

            conn.exec(commands, (err, stream) => {
                if (err) {
                    reject(err);
                    conn.end();
                    return;
                }

                stream
                    .on("close", (code: any, signal: any) => {
                        console.log(`Command "${commands}" finished with code ${code}, signal: ${signal}`);
                        resolve(output);
                    })
                    .on("data", (data: any) => {
                        output += data.toString();
                        console.log(`STDOUT: ${data.toString()}`);
                    })
                    .stderr.on("data", (data) => {
                        console.error(`STDERR: ${data.toString()}`);
                    });
            });
        });
    };

    await conn
        .on("ready", async () => {
            console.log("SSH connection established");

            try {
                const output = await executeCommands(conn, commands);
                console.log("Command Output:", output);
            } catch (err) {
                console.error("Error executing commands:", err);
            } finally {
                conn.end(); // Close connection gracefully
                console.log("SSH connection closed.");
            }
        })
        .on("error", (err) => {
            console.error("SSH connection error:", err);
        })
        .on("end", () => {
            console.log("SSH session ended.");
        })
        .connect(sshConfig);

}
