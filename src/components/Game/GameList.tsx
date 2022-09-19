import useSWR from "swr";
import {fetcher} from "@services/api";
import styles from "@pages/match/index/index.module.scss";
import Grid from "@mui/material/Grid";
import GameCard from "@components/GameCard";
import Box from "@mui/material/Box";

interface props {
    selectedGame: number[]
    setSelectedGame: CallableFunction
}


const GameList = (props: props) => {
    const {data, error} = useSWR("/api/game/all", fetcher)
    if (!data && !error) {
        return (
            <>
                Loading
            </>
        )
    }
    const selectedGame = [...props.selectedGame]

    const handleClickGame = (id: number) => {
        const idx = selectedGame.indexOf(id)
        if (idx === -1) {
            selectedGame.push(id)
        } else {
            selectedGame.splice(idx, 1)
        }
        // set selectedGame
        props.setSelectedGame(selectedGame)
        console.log("selected game ids = ", selectedGame)
    }

    if (data) {
        const games = data.data as [{ game_name: string, game_description: string, id: number, img_url: string }]
        return (
            <>
                <Box className={styles.cardContainer}>
                    <Grid container spacing={3}>
                        {games.map((game) => {
                            return (
                                <Grid item xs={2} key={game.id}
                                      sx={{opacity: (selectedGame.indexOf(game.id) === -1 ? 0.7 : 1)}}>
                                    <GameCard gameName={game.game_name} description={game.game_description}
                                              gameIntId={game.id} imgUrl={"" || "/lizzard.png"}
                                              onClick={handleClickGame}></GameCard>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </>
        )
    }
    return (
        <>
            Error
        </>
    )

}

export default GameList