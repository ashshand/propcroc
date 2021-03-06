//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");

//notes on site
//urls structured like this https://www.mcgrath.com.au/533726, https://www.mcgrath.com.au/533728,  https://www.mcgrath.com.au/533731, https://www.mcgrath.com.au/533736, 533737, 533738, 533739. It isn't +1 (i.e. some ids are skipped). It apperas to be a random skip (sometimes +1, sometimes +6)
//so could just plug in random ids instead of doing site search..
//mcgrath site search only allows one suburb at a time otherwise and can't find a way around it. Can however cycle through post codes, if you keep surroundingsuburbs set to true 
//https://www.mcgrath.com.au/search#listingresult_mq=2000&listingresult_e=0&listingresult_g=1&listingresult_type=buy&listingresult_surroundingsuburbs=true

const codes_check_full = [
  2000,2001,2002,2004,2006,2007,2008,2009,2010,2011,2012,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2052,2055,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2070,2071,2072,2073,2074,2075,2076,2077,2079,2080,2081,2082,2083,2084,2085,2086,2087,2088,2089,2090,2091,2092,2093,2094,2095,2096,2097,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2109,2110,2111,2112,2113,2114,2115,2116,2117,2118,2119,2120,2121,2122,2123,2124,2125,2126,2127,2128,2129,2130,2131,2132,2133,2134,2135,2136,2137,2138,2139,2140,2141,2142,2143,2144,2145,2146,2147,2148,2150,2151,2152,2153,2154,2155,2156,2157,2158,2159,2160,2161,2162,2163,2164,2165,2166,2167,2168,2170,2171,2172,2173,2174,2175,2176,2177,2178,2179,2190,2191,2192,2193,2194,2195,2196,2197,2198,2199,2200,2203,2204,2205,2206,2207,2208,2209,2210,2211,2212,2213,2214,2216,2217,2218,2219,2220,2221,2222,2223,2224,2225,2226,2227,2228,2229,2230,2231,2232,2233,2234,2250,2251,2252,2256,2257,2258,2259,2260,2261,2262,2263,2264,2265,2267,2278,2280,2281,2282,2283,2284,2285,2286,2287,2289,2290,2291,2292,2293,2294,2295,2296,2297,2298,2299,2300,2302,2303,2304,2305,2306,2307,2308,2309,2310,2311,2312,2314,2315,2316,2317,2318,2319,2320,2321,2322,2323,2324,2325,2326,2327,2328,2329,2330,2331,2333,2334,2335,2336,2337,2338,2339,2340,2341,2342,2343,2344,2345,2346,2347,2348,2350,2351,2352,2353,2354,2355,2356,2357,2358,2359,2360,2361,2365,2369,2370,2371,2372,2379,2380,2381,2382,2386,2387,2388,2390,2395,2396,2397,2398,2399,2400,2401,2402,2403,2404,2405,2406,2408,2409,2410,2411,2415,2420,2421,2422,2423,2424,2425,2426,2427,2428,2429,2430,2431,2439,2440,2441,2442,2443,2444,2445,2446,2447,2448,2449,2450,2452,2453,2454,2455,2456,2460,2462,2463,2464,2465,2466,2469,2470,2471,2472,2473,2474,2475,2476,2477,2478,2479,2480,2481,2482,2483,2484,2485,2486,2487,2488,2489,2490,2500,2502,2505,2506,2508,2515,2516,2517,2518,2519,2520,2521,2522,2525,2526,2527,2528,2529,2530,2533,2534,2535,2536,2537,2538,2539,2540,2541,2545,2546,2548,2549,2550,2551,2555,2556,2557,2558,2559,2560,2563,2564,2565,2566,2567,2568,2569,2570,2571,2572,2573,2574,2575,2576,2577,2578,2579,2580,2581,2582,2583,2584,2585,2586,2587,2588,2590,2594,2611,2618,2619,2620,2621,2622,2623,2624,2625,2626,2627,2628,2629,2630,2631,2632,2633,2640,2641,2642,2643,2644,2645,2646,2647,2648,2649,2650,2651,2652,2653,2655,2656,2658,2659,2660,2661,2663,2665,2666,2668,2669,2671,2672,2675,2678,2680,2681,2700,2701,2702,2703,2705,2706,2707,2708,2710,2711,2712,2713,2714,2715,2716,2717,2720,2721,2722,2725,2726,2727,2729,2730,2731,2732,2733,2734,2735,2736,2737,2738,2739,2745,2747,2748,2749,2750,2751,2752,2753,2754,2755,2756,2757,2758,2759,2760,2761,2762,2763,2765,2766,2767,2768,2769,2770,2773,2774,2775,2776,2777,2778,2779,2780,2782,2783,2784,2785,2786,2787,2790,2791,2792,2793,2794,2795,2797,2798,2799,2800,2803,2804,2805,2806,2807,2808,2809,2810,2818,2820,2821,2823,2824,2825,2826,2827,2828,2829,2830,2831,2832,2833,2834,2835,2836,2838,2839,2840,2842,2843,2844,2845,2846,2847,2848,2849,2850,2852,2864,2865,2866,2867,2868,2869,2870,2871,2873,2874,2875,2876,2877,2878,2879,2880,2890,2891,2898,2899,3500,3644,3691,3707,4377,4380,4383,4385
];

//for testing
const codes_check = [2000,2022,2030,2001,3000];

(async () => {
  const browser = await playwright.chromium.launch({
    channel: 'msedge', //or msedge etc
    headless: false,
    slowMo: 50,
    actionTimeout: 10000
  });

  let write_data = [];
  let href_selector = '.search-result-list > li .insights__caption a';

  const page = await browser.newPage();

  let codesLoopLimit = 5; 
  let codesLength = codes_check.length;
  let codesLoopFinish = Math.min(codesLoopLimit, codesLength);

  async function loopThroughCodes(codesLoopFinish, codes_array) {
    for(let z = 0; z < codesLoopFinish; z++) {
      let codes_1 = codes_array[z];
      let full_url = `https://www.mcgrath.com.au/search#listingresult_mq=${codes_1}&listingresult_e=0&listingresult_g=1&listingresult_type=buy&listingresult_surroundingsuburbs=true`;
      await page.goto(full_url);
        
      async function loopNextPages(loopLimit) { //this will go through and click see more until nothing left. Only after then does it crawl (given all of these will be loaded on same page)
          for(let x = 0; x < loopLimit; x++) { //the loop limit is a kill switch - it will keep clicking load more until either load more not visible or looplimit reached
      
            try { loadMoreFound = await page.waitForSelector('.component.load-more:visible', {timeout: 5000}); }
            catch { break; } //will exit loop if no more load mores found 
            await page.click('.component.load-more:visible');
          
            await page.waitForSelector(href_selector, {timeout: 5000});
            await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded        
          
          }
      
      }
      
      const loopThrough = await loopNextPages(4);

      await page.waitForTimeout(10000); //waits another 5 seconds to make sure everything loaded
      
      var houses_links = page.locator(href_selector, {strict: false});
          
      var c = await houses_links.count();
          
      for(let i = 0; i < c; i++) {
        let house_link = await houses_links.nth(i).getAttribute('href');
        console.log(house_link);
        write_data.push ({
        house_link,
        })
      }    

    } //end for loop

  } //end overall async

  const runOverallLoop = await loopThroughCodes(codesLoopFinish, codes_check);
    
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("house_links/housesmcgrath.json", jsonData);

  await browser.close();

  
})();



