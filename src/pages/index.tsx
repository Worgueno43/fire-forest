import Head from "next/head";
import { useEffect, useState } from "react";

import { Grid } from "~/components/Grid/Grid";
import {
  defaultFirePosition,
  grid,
  propagationProbability
} from "~/utils/config";
import type { Case } from "~/utils/type";

import { defaultGrid, firePropagation } from "../utils/tools";

export default function Home() {
  const [gridDisplay, setGridDisplay] = useState<Case[][] | undefined>(
    defaultGrid(grid, defaultFirePosition)
  );

  // Regarde si il y a des case en feu
  const [fireFinish, setFireFinish] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (gridDisplay && !fireFinish) {
        const { updatedGrid, numberOfFires } = firePropagation(
          gridDisplay,
          propagationProbability
        );
        setGridDisplay(updatedGrid);

        setFireFinish(numberOfFires > 0 ? false : true);
      }
    }, 1000);
  }, [fireFinish, gridDisplay]);

  const replayFireSpreading = () => {
    setGridDisplay(defaultGrid(grid, defaultFirePosition));
    setFireFinish(false);
  };

  return (
    <>
      <Head>
        <title>Fire Forest App !</title>
        <meta name="description" content="Fire forest app for Ciril GROUP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col bg-main h-[100vh] items-center justify-center">
        <h1 className="text-3xl font-bold text-center p-4 fixed top-0 text-forest">
          Fire Forest Simulation
        </h1>

        {gridDisplay && <Grid grid={gridDisplay} />}

        {fireFinish && (
          <div className="mt-2 flex items-center justify-center flex-col">
            <p className="text-xl">Fire spreading ended !</p>
            <button
              className="bg-fire p-2 rounded"
              onClick={replayFireSpreading}
            >
              Replay
            </button>
          </div>
        )}
      </main>
    </>
  );
}
