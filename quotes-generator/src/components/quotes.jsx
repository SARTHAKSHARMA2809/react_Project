import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";

const Quotes = () => {
    const [quote, setQuote] = useState("");

    const fetchQuote = async () => {
        try {
            const response = await axios.get("https://api.adviceslip.com/advice");
            setQuote(response.data.slip.advice);
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const handleShare = async () => {
        if (!quote) return;

        // If the browser supports Web Share API
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Inspirational Quote",
                    text: `"${quote}"`,
                    url: window.location.href, // Can be removed if sharing just text
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            // Fallback: Copy to Clipboard
            navigator.clipboard.writeText(quote);
            alert("Quote copied to clipboard!");
        }
    };

    return (
        <Container maxWidth="md">
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                height="100vh"
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
                    Quotes Generator
                </Typography>
                
                <Card sx={{ minWidth: 400, maxWidth: 600, p: 3, boxShadow: 6, borderRadius: 3, textAlign: "center", background: "#f5f5f5" }}>
                    <CardContent>
                        <Typography variant="h5" fontStyle="italic" color="text.primary">
                            "{quote || "Loading..."}"
                        </Typography>
                    </CardContent>
                </Card>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ px: 3, py: 1, fontSize: "1rem", borderRadius: 2, fontWeight: "bold" }} 
                            onClick={fetchQuote}
                        >
                            Get New Quote
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            sx={{ px: 3, py: 1, fontSize: "1rem", borderRadius: 2, fontWeight: "bold" }}
                            onClick={handleShare}
                        >
                            Share Quote
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Quotes;
