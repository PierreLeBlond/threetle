import puppeteer from "puppeteer";
import { describe, expect, test, vi } from "vitest";

describe("support", () => {
  const consoleSpy = vi.spyOn(console, 'log');

  test.each([
    ["WebGL 1.0", ["--disable-webgl2", "--disable-webgpu"]],
    ["WebGL", ["--disable-webgpu"]],
    ["WebGPU", ["--enable-unsafe-webgpu"]],
  ])("should support %s", async (name, args) => {
    const browser = await puppeteer.launch({
      args,
    });
    const page = await browser.newPage();

    page.on("console", (message) => {
      if (message.type() === "info") {
        console.log(message.text());
      }
    });

    await page.goto("http://localhost:5173");

    await expect.poll(() => consoleSpy).toHaveBeenCalledWith(`Using ${name} renderer`);

    await browser.close();
  });
});
