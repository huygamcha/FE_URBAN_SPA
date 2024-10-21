import React from 'react';
import initTranslations from 'src/configs/i18n';
import TranslationProvider from 'src/app/[locale]/TranslationProvider';
import { StoreWrapper } from 'src/hoc/StoreWrapper';

const i18nNamespaces = ['translation'];

export default async function Layout({ children, params: { locale } }: any) {
      const { resources } = await initTranslations(locale, i18nNamespaces);

      return (
            <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
                  <StoreWrapper>
                        {children}
                  </StoreWrapper>
            </TranslationProvider>
      );
}