import puppeteer from "puppeteer";
import { describe, expect, test } from "vitest";

function expectNotToBeNull<T>(value: null | T): asserts value is T {
  expect(value).not.toBeNull();
}

describe("square", () => {
  test.each([
    ["WebGL", ["--disable-webgpu"]],
    ["WebGPU", ["--enable-unsafe-webgpu", "--use-gl=desktop"]],
  ])("should display a square with %s", async (_, args) => {
    const browser = await puppeteer.launch({
      args,
    });
    const page = await browser.newPage();

    await page.goto("http://localhost:5173/examples/square.html");

    await page.setViewport({height: 512, width: 512});

    const canvas = await page.waitForSelector("canvas");

    expectNotToBeNull(canvas);

    const image = await canvas.screenshot();

    expect(image).toMatchImageSnapshot();

    await browser.close();
  });
});
