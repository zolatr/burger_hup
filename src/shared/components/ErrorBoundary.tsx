import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
                    <AlertCircle className="mb-4 h-16 w-16 text-destructive" />
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">
                        Bir şeyler yanlış gitti
                    </h1>
                    <p className="mb-8 text-muted-foreground">
                        Uygulama beklenmedik bir hatayla karşılaştı.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => window.location.reload()}
                            variant="default"
                        >
                            Sayfayı Yenile
                        </Button>
                        <Button
                            onClick={() => (window.location.href = "/")}
                            variant="outline"
                        >
                            Anasayfaya Dön
                        </Button>
                    </div>
                    {this.state.error && (
                        <pre className="mt-8 max-w-lg overflow-auto rounded bg-muted p-4 text-left text-xs text-muted-foreground">
                            {this.state.error.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
