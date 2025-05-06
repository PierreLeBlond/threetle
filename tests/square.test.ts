import puppeteer from "puppeteer";
import { describe, expect, test } from "vitest";

function expectNotToBeNull<T>(value: null | T): asserts value is T {
  expect(value).not.toBeNull();
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("square", () => {
  test.each([
    ["WebGL 1.0", ["--disable-webgl2", "--disable-webgpu", "--use-gl=desktop"]],
    ["WebGL", ["--disable-webgpu"]],
    ["WebGPU", ["--enable-unsafe-webgpu", "--use-gl=desktop"]],
  ])("should display a square with %s", async (_, args) => {
    const browser = await puppeteer.launch({
      args,
    });
    const page = await browser.newPage();

    page.on("console", (message) => {
      console.log(message.text());
    });

    await page.goto("http://localhost:5173/examples/square.html");

    await page.setViewport({height: 512, width: 512});

    const canvas = await page.waitForSelector("canvas");

    expectNotToBeNull(canvas);

    await wait(2000);

    const image = await canvas.screenshot();

    expect(image).toMatchImageSnapshot();

    await browser.close();
  });
});
